import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Panel, Placeholder, Row, Col } from 'rsuite';
import Logout from '@mui/icons-material/Logout';
import { SignOutMethod } from '../Auth/Helper';
import { useRouter } from 'next/router';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DisplayProjectList from './DsiplayProjectList';

const drawerWidth = 240;

const Card = props => (
    <Panel {...props} bordered style={{ margin: 8, minWidth: 300 }} header={props.title} >
        <p>enenen/fe</p>
        <p>enenen/fe</p>
        <p>enenen/fe</p>
        <p>enenen/fe</p>

    </Panel>
);

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
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

export default function MiniDrawer() {
    const theme = useTheme();
    const router = useRouter()
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleSignout = async () => {
        try {
            await SignOutMethod();
            router.push("/Auth/Login")
        } catch (error) {
            console.log(error)
        }
    }

    const goToTeams = async()=>{
        try {
            router.push("/Team/Team")
        } catch (error) {
            console.log(error)
        }
    }

    const goToProjCreation = async(path)=>{
        try {
            router.push(path)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}

                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Project Collaboration Platform 
                    </Typography>

                    <IconButton onClick={()=>router.push("/Profile")}>
                        <AccountCircleIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>

                    <ListItem key={"log out"} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={handleSignout}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <Logout />
                            </ListItemIcon>
                            <ListItemText primary={"logout"} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem key={"add Team"} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                        onClick={goToTeams}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <AddBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"add Team"} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem key={"Create proj"} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                        onClick={()=>goToProjCreation("/Project/Create")}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <AddBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Create project"} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    
                    <ListItem key={"Create proj"} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                        onClick={()=>goToProjCreation("/Project")}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <AddBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Create project"} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>

                </List>
                <Divider />

            </Drawer>


            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Row class="d-flex align-items-center justify-content-center">
          <DisplayProjectList />
        </Row>
      </Box>

        </Box>
    );
}
