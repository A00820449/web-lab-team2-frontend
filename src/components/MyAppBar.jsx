import {useState, Fragment} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import WebIcon from '@mui/icons-material/Web';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link as RouterLink } from 'react-router-dom'
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

export default function MyAppBar() {
    const [state, setState] = useState(false)
    const drawerWidth = "min(80vw,400px)"
    const setDrawer = (/**@type {boolean}*/state) => () => {
        setState(state)
    }
    return (
        <Fragment>
            <AppBar position='sticky'>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={setDrawer(true)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                         My app
                    </Typography>
                    <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor='left' open={state} onClose={setDrawer(false)} keepMounted>
                <Box sx={{width: drawerWidth}}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton LinkComponent={RouterLink} to="/">
                                <ListItemIcon>
                                    <WebIcon />
                                </ListItemIcon>
                                <ListItemText primary="Placeholder"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton LinkComponent={RouterLink} to="/home">
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Home"/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Fragment>
    )
}