/*
Author: Dhruvkumar Patel 
*/
import React from "react";

import Box from '@mui/material/Box';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Toolbar from '@mui/material/Toolbar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import "../styles/navbar.css";
import { useCookies } from "react-cookie";

class SidebarCmp extends React.Component{
    constructor(props){
        super(props);
    }

    navigateToHome(){
        this.props.navigate('/dashboard');
    }

    navigateToTransactions(){
        this.props.navigate('/dashboard/transactions');
    }

    navigateToProfile(){
        this.props.navigate('/dashboard/profile');
    }

    navigateToNewUsers(){
        this.props.navigate('/dashboard/newUsers');
    }

    

    render(){
        return(
            <Box sx={{ height:1.0 }} className="sidebar-border sidebar-bg">
                
                <Toolbar />
                <Divider />
                <List>
                
                    <ListItem key={"Home"} disablePadding>
                        <ListItemButton onClick={() => this.navigateToHome()}>
                            <ListItemIcon>
                                {<HomeIcon />}
                            </ListItemIcon>
                            <ListItemText primary={'Home'} />
                        </ListItemButton>
                    </ListItem>
                
                    <ListItem key={"Transaction"} disablePadding>
                        <ListItemButton onClick={() => this.navigateToTransactions()}>
                            <ListItemIcon>
                                {<EventNoteIcon />}
                            </ListItemIcon>
                            <ListItemText primary={'Transaction'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"NewUSer"} disablePadding>
                        <ListItemButton onClick={() => this.navigateToNewUsers()}>
                            <ListItemIcon>
                                {<ManageAccountsIcon />}
                            </ListItemIcon>
                            <ListItemText primary={'Pending Application'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"Profile"} disablePadding>
                        <ListItemButton onClick={() => this.navigateToProfile()}>
                            <ListItemIcon>
                                {<AccountBoxIcon />}
                            </ListItemIcon>
                            <ListItemText primary={'Profile'} />
                        </ListItemButton>
                    </ListItem>
                
                </List>
                <Divider />
                <List>
                
                <ListItem key={"Logout"} disablePadding>
                        <ListItemButton onClick={() => this.props.logout()}>
                            <ListItemIcon>
                                {<ExitToAppIcon />}
                            </ListItemIcon>
                            <ListItemText primary={'Logout'} />
                        </ListItemButton>
                    </ListItem>
                </List>
      </Box>
        )
    }
}


// let container = window !== undefined ? () => window().document.body : undefined;
const handleDrawerToggle = () => {
    //setMobileOpen(!this.mobileOpen);
    //pass
  };
  
function Sidebar(){
    const [cookies, setCookie, removeCookie] = useCookies(['admin']);

    const logoutFun = () => {
        removeCookie('email');
        navigate('/');
        }
    const navigate = useNavigate();
    return(
            <Box
            component="nav"
            sx={{ width: { sm: 240 }, flexShrink: { sm: 0 }, height: 1.0}}
            borderRight={1}
            className="sidebar-border sidebar-bg"
            aria-label="mailbox folders">

                <Drawer
                     
                    variant="temporary"
                    open={false}
                    onClose={handleDrawerToggle()}
                    ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                    }}
                >     
                </Drawer>
                <SidebarCmp navigate={navigate} logout={logoutFun}></SidebarCmp>
                 
            </Box>

        
   )
}

export default Sidebar;