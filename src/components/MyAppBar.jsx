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
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { AppContext } from '../App';
import { useContext } from 'react';

export default function MyAppBar() {
    const [state, setState] = useState(false)

    const [anchor, setAnchor] = useState(null)
    const ctx = useContext(AppContext)

    const open = Boolean(anchor)
    const drawerWidth = "min(80vw,400px)"
    const setDrawer = (/**@type {boolean}*/state) => () => {
        setState(state)
    }

    /**
     * @param {Event} e 
     */
    const handleClick = (e) => {
        setAnchor(e.currentTarget)
    }
    const handleClose = () => {
        setAnchor(null)
    }

    const logOut = () => {
        ctx.setToken("")
    }

    return (
        <Fragment>
            <AppBar position='sticky'>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={setDrawer(true)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Box component={RouterLink} to="home" sx={{ display: 'inline', textDecoration: "none", color: "inherit" }}>
                            Animalia
                        </Box>
                    </Typography>
                    <IconButton onClick={handleClick} size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <Menu anchorEl={anchor} open={open} onClose={handleClose}>
                        <MenuItem component={RouterLink} to="user" onClick={handleClose}>
                            User Page
                        </MenuItem>
                        <MenuItem onClick={logOut} sx={{fontWeight: "bold"}}>
                            Log out
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer anchor='left' open={state} onClose={setDrawer(false)} keepMounted>
                <Box sx={{width: drawerWidth}} onClick={setDrawer(false)}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton component={RouterLink} to="home">
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Home"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={RouterLink} to="placeholder">
                                <ListItemIcon>
                                    <WebIcon />
                                </ListItemIcon>
                                <ListItemText primary="Placeholder"/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Fragment>
    )
}