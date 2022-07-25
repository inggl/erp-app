import * as React from "react";
import {
    Badge,
    Box,
    Button,
    CssBaseline,
    CSSObject,
    Divider,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuItem,
    PaletteMode,
    Popover,
    styled,
    Theme,
    Toolbar,
    Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar";
import {LOCALES} from "../i18n/locales";
import {useDispatch} from "react-redux";
import {getNotificationRequest, notificationSubscribe, setNotifications} from "../store/actions/notificationActions";
import {NotificationState} from "../store/types/notificationTypes";
import {useAppSelector} from "../hooks/useAppSelector";
import {signIn, signOut, useSession} from "next-auth/react";
import makeData from "../utils/makeData";
import {Notification} from "../interfaces/notification";
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {formatDistance} from 'date-fns';
import Link from "next/link";
import {useIntl} from "react-intl";

export const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

interface NavBarProps {
    title: string,
    locale: string,
    onLocaleChange: (locale: string) => void
    palette: PaletteMode,
    onPaletteChange: (palette: PaletteMode) => void
}

export const NavBar: React.FC<NavBarProps> = ({
                                                  title,
                                                  locale,
                                                  onLocaleChange,
                                                  palette,
                                                  onPaletteChange
                                              }: NavBarProps) => {
    const executedRef = React.useRef(false);

    const theme = useTheme();
    const intl = useIntl();
    const {data: session} = useSession();
    const dispatch = useDispatch();

    const [accountMenuAnchorEl, setAccountMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const isAccountMenuOpen = Boolean(accountMenuAnchorEl);

    const [drawerOpen, setDrawerOpen] = React.useState(true);

    const [localeMenuAnchorEl, setLocaleMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const isLocaleMenuOpen = Boolean(localeMenuAnchorEl);

    const [notificationAnchorEl, setNotificationAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const isNotificationOpen = Boolean(notificationAnchorEl);
    const notificationId = isNotificationOpen ? 'notification-popover' : undefined;

    const {notifications, loading, error}: NotificationState = useAppSelector(state => state.notification);

    React.useEffect(() => {
        if (executedRef.current) {
            return;
        }

        if (process.env.MOCK) {
            let notifications = makeData('notification', 5) as Notification[];
            dispatch(setNotifications(notifications));
        } else {
            dispatch(getNotificationRequest());
            dispatch(notificationSubscribe());
        }

        executedRef.current = true;
    }, []);

    const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAccountMenuAnchorEl(event.currentTarget);
    };

    const handleAccountMenuClose = () => {
        setAccountMenuAnchorEl(null);
    };

    const handleLocaleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
        setLocaleMenuAnchorEl(e.currentTarget);
    }

    const handleLocaleMenuClose = (e: React.MouseEvent<HTMLElement>) => {
        onLocaleChange((e.currentTarget.textContent ? e.currentTarget.textContent : LOCALES.ENGLISH));
        setLocaleMenuAnchorEl(null);
    }

    const togglePaletteMode = () => {
        onPaletteChange(palette === "light" ? "dark" : "light");
    }

    const handleNotificationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setNotificationAnchorEl(null);
    };

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const accountMenuId = 'account-menu';
    const renderProfileMenu = (
        <Menu
            anchorEl={accountMenuAnchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={accountMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isAccountMenuOpen}
            onClose={handleAccountMenuClose}>
            <MenuItem onClick={handleAccountMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleAccountMenuClose}>My account</MenuItem>
        </Menu>
    );

    const localeMenuId = 'locale-menu';
    const renderLocaleMenu = (
        <Menu
            anchorEl={localeMenuAnchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            id={localeMenuId}
            keepMounted
            open={isLocaleMenuOpen}
            onClose={handleLocaleMenuClose}>
            {Object.values(LOCALES).map(locale => (
                <MenuItem key={locale} onClick={handleLocaleMenuClose}>
                    <Typography mr={1} component={"span"} className={`fi fi-${locale.split("-").pop()}`}/>
                    <Typography component={"span"}>{locale}</Typography>
                </MenuItem>
            ))}
        </Menu>
    );

    return (
        <>
            <CssBaseline/>
            <AppBar position="fixed" open={drawerOpen}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(drawerOpen && {display: 'none'}),
                        }}>
                        <MenuIcon/>
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open menu"
                        sx={{mr: 2, display: {sm: 'none'}}}>
                        <MenuIcon/>
                    </IconButton>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block', fontFamily: 'Oswald'}}}>
                        {title}
                    </Typography>
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: 'flex'}}}>
                        <Button id="locale-menu-button"
                                aria-controls={localeMenuId}
                                aria-haspopup="true"
                                color={'inherit'}
                                variant={'text'}
                                onClick={handleLocaleMenuOpen}
                                endIcon={<KeyboardArrowDownIcon/>}>
                            <span className={`fi fi-${locale?.split("-").pop()}`}/>
                        </Button>

                        <IconButton
                            color="inherit"
                            aria-label="Switch theme"
                            onClick={togglePaletteMode}>
                            {palette === "light" ? (<LightModeIcon/>) : (<ModeNightIcon/>)}
                        </IconButton>

                        <IconButton
                            size="large"
                            aria-describedby={notificationId}
                            aria-label="new notifications"
                            onClick={handleNotificationClick}
                            color="inherit">
                            <Badge component={'div'} badgeContent={notifications?.length} color="error">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>

                        <Popover
                            id={notificationId}
                            open={isNotificationOpen}
                            anchorEl={notificationAnchorEl}
                            onClose={handleNotificationClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}>

                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                p: 1,
                                m: 1,
                                borderRadius: 1,
                                maxHeight: '50vh'
                            }}>
                                {!loading && !error && notifications && notifications.map(notification => (
                                    <React.Fragment key={notification.id}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            p: 1,
                                            m: 1,
                                            fontSize: '0.875rem'
                                        }} key={notification.id}>
                                            <Box sx={{minWidth: '15vw', mr: 2}}>
                                                <Typography sx={{fontWeight: 'bold'}}
                                                            variant="subtitle2">{notification.title}</Typography>
                                                <Typography variant="body2">{notification.message}</Typography>
                                            </Box>
                                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                <Typography
                                                    variant="body2">{formatDistance(new Date(notification.createdAt), new Date(), {addSuffix: true})}</Typography>
                                            </Box>
                                        </Box>
                                        <Divider/>
                                    </React.Fragment>
                                ))}
                            </Box>
                        </Popover>

                        <Box sx={{ml: 1}}>
                            {session && (
                                <>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Box>{session.user?.name}</Box>

                                        <Tooltip title={'Logout'}>
                                            <IconButton
                                                size="large"
                                                edge="end"
                                                aria-label="logout"
                                                onClick={() => signOut()}
                                                color="inherit">
                                                <LogoutIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </>

                            )}

                            {!session && (
                                <Tooltip title={'Login'}>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="login"
                                        onClick={() => signIn()}
                                        color="inherit">
                                        <LoginIcon/>
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Box>

                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={accountMenuId}
                            aria-haspopup="true"
                            onClick={handleAccountMenuOpen}
                            color="inherit">
                            <AccountCircle/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={drawerOpen}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List className="Menu">
                    <ListItem>
                        <Link href={'/'}>
                            {intl.formatMessage({id: "menu.home"})}
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href={'/dashboard'}>
                            {intl.formatMessage({id: "menu.dashboard"})}
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href={'/products'}>
                            {intl.formatMessage({id: "menu.products"})}
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href={'/suppliers'}>
                            {intl.formatMessage({id: "menu.suppliers"})}
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href={'/customers'}>
                            {intl.formatMessage({id: "menu.customers"})}
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href={'/orders'}>
                            {intl.formatMessage({id: "menu.orders"})}
                        </Link>
                    </ListItem>
                </List>
            </Drawer>
            {renderProfileMenu}
            {renderLocaleMenu}
        </>
    )
}