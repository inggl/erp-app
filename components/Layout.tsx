import {Box, PaletteMode, Paper, Theme, Toolbar} from "@mui/material";
import React from "react"
import {drawerWidth, NavBar} from "./NavBar";

type LayoutProps = {
    children: React.ReactNode,
    locale: string,
    theme: Theme,
    onLocaleChange: (locale: string) => void,
    onPaletteChange: (palette: PaletteMode) => void
}

export const Layout: React.FC<LayoutProps> = ({
                                                  children,
                                                  locale,
                                                  theme,
                                                  onLocaleChange,
                                                  onPaletteChange
                                              }: LayoutProps) => {
    const title = "ERP";

    const handleLocaleChange = (locale: string) => {
        onLocaleChange(locale);
    }

    const handlePaletteChange = (palette: PaletteMode) => {
        onPaletteChange(palette)
    }

    return (
        <>
            <Box sx={{display: 'flex', height: '100%'}}>
                <NavBar title={title} locale={locale} onLocaleChange={handleLocaleChange}
                        palette={theme.palette.mode} onPaletteChange={handlePaletteChange}/>
                <Box component="main"
                     sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}>
                    <Toolbar/>
                    <Paper sx={{width: '100%', overflow: 'auto', height: 'calc(100% - 64px)', p: 3}}>
                        <Box sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                            {children}
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </>
    )
}

export default Layout;