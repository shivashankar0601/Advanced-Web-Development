/*
Author: Dhruvkumar Patel
*/

import React from "react";
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import "../styles/navbar.css";
import { useCookies } from "react-cookie";

class AdminNavBarCmp extends React.Component{
    constructor(props){
        super(props);
    }
    handleDrawerToggle = () => {
        
      };
    render(){
        return(
            <AppBar
                    position="fixed"
                    sx={{
                    // width: { sm: `calc(100% - ${240}px)` },
                    ml: { sm: `${240}px` },
                    }}
                    className="nav-bar-bg"
                >
                    <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={this.handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Signed as: {this.props.cookies.email}
                    </Typography>
                    </Toolbar>
            </AppBar>
        )
    }
}


function AdminNavBar(props){
    const [cookies] = useCookies(['admin']);
    return(
        <AdminNavBarCmp cookies={cookies} ></AdminNavBarCmp>
    )
}

export default AdminNavBar;