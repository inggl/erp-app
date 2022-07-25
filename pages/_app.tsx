import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {PaletteMode, Theme, ThemeProvider} from "@mui/material";
import React, {useState} from "react";
import {LOCALES} from "../i18n/locales";
import {IntlProvider} from "react-intl";
import {MESSAGES} from "../i18n/messages";
import {Provider} from "react-redux";
import store from "../store/store";
import {useLocalStorage} from "react-use";
import axios from "axios";
import {ToastContainer} from "react-toastify";
import {SessionProvider} from "next-auth/react";
import Layout from '../components/Layout';
import themes from "../theme/themes";
import { useRouter } from 'next/router';

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
    const executedRef = React.useRef(false);

    const router = useRouter();

    const [loading, setLoading] = React.useState<boolean>(true);
    const [theme, setTheme] = React.useState<Theme>(themes.light);
    const [locale, setLocale] = React.useState<string>(LOCALES.ENGLISH);

    const [localeStorageValue, setLocaleStorageValue, removeLocaleStorageValue] = useLocalStorage<string>('locale');
    const [paletteModeStorageValue, setPaletteModeStorageValue, removePaletteModeStorageValue] = useLocalStorage<PaletteMode>('paletteMode');
    const [lastVisitedPage, setLastVisitedPage, removeLastVisitedPage] = useLocalStorage<string>('lastVisitedPage');

    React.useEffect(() => {
        if (executedRef.current) {
            return;
        }

        // Add default axios configuration
        axios.defaults.baseURL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : "http://localhost:8080";

        axios.interceptors.request.use(config => {
            if (config && config.headers) {
                // config.headers.Authorization = `Bearer `
            }

            return config;
        });

        // Restore locale and theme
        if (localeStorageValue) {
            setLocale(localeStorageValue);
        }

        if (paletteModeStorageValue) {
            setTheme(paletteModeStorageValue === 'light' ? themes.light : themes.dark)
        }

        // Restore last visited page
        if (lastVisitedPage) {
            router.replace({pathname: lastVisitedPage}).then(() => {});
        }

        // Add route change listener
        const handleRouteChange = (url: string) => {
            setLastVisitedPage(url)
        }

        router.events.on('routeChangeComplete', handleRouteChange);

        setLoading(false);
        executedRef.current = true;

        return () => {
            removeLocaleStorageValue();
            removePaletteModeStorageValue();
        }
    }, []);

    const handleLocaleChange = (locale: string) => {
        setLocaleStorageValue(locale);
        setLocale(locale);
    }

    const handlePaletteChange = (palette: PaletteMode) => {
        setPaletteModeStorageValue(palette);
        setTheme(palette === 'light' ? themes.light : themes.dark)
    }

    return (
        <>
            <SessionProvider session={session}>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <IntlProvider key={locale} messages={MESSAGES[locale]} locale={locale}
                                      defaultLocale={LOCALES.ENGLISH}>

                            {!loading && (
                                <>
                                    <Layout locale={locale} theme={theme} onLocaleChange={handleLocaleChange}
                                            onPaletteChange={handlePaletteChange}>
                                        <Component {...pageProps} />
                                    </Layout>
                                </>
                            )}

                            <ToastContainer/>
                        </IntlProvider>
                    </ThemeProvider>
                </Provider>
            </SessionProvider>
        </>
    )
}

export default MyApp
