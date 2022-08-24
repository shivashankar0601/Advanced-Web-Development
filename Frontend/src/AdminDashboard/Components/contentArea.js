/*
Author: Dhruvkumar Patel 
*/
import React from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;
class ContentAreaCmp extends React.Component{
    constructor(props){
        super(props);
        let mobileOpen = false;
    }
    handleDrawerToggle = () => {
      };
    
    render() {
        return (
            <div>

                
                <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                    >
                    <Toolbar />
                    <Typography paragraph>
                       
                    </Typography>
                    <Typography paragraph>
                        
                    </Typography>
                </Box>
            </div>
        );
    }
}

export default ContentAreaCmp;