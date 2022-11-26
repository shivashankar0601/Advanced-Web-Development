/*
Authors : Dhruvkumar Patel 
*/
import React, { cloneElement } from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from "../Components/sidebar";
import AdminNavBar from "../Components/Navbar";
import { CardContent, Grid } from "@mui/material";
import Card from '@mui/material/Card';
import axios from "axios";
import '../styles/mainPageCards.css';
import { useCookies } from "react-cookie";
import ErrorNotFound from "./error404";
const style = {
    bgcolor :  '#F2F2F2'
}


const baseURL = "https://peaceful-brushlands-56321.herokuapp.com/"
const getCardDataUrl = baseURL + "admin/details/"
class MainPageCard extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return(
            <React.Fragment>
                <Card variant="outlined" sx={{ minWidth: '300px'}} align="center" className="detail-card">

                    <CardContent>
                    <Typography sx={{ fontSize: 14, pb:3 }} className="card-date" gutterBottom>
                    {new Date().toLocaleString("en-US", { day : '2-digit'})} - {new Date().toLocaleString("en-US", { month: "long" })}
                     - {new Date().getFullYear()}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} className="card-divider">
                            <Divider />
                    </Typography>

                        <Typography sx={{ fontSize: 15}} color="text.secondary" gutterBottom>
                        
                        </Typography>
                        <Typography className="card-title" component="div">
                            {this.props.heading}
                        </Typography>
                        
                        <Typography className="card-title">
                            {this.props.count}
                        </Typography>
                    </CardContent>
                </Card>
                
            </React.Fragment>
        )
    }
}

class MainPageCMP extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            newUsers : null,
            activeUsers: null,


        }
    }
    async getCardDeatils(){
        var data =  axios.get(getCardDataUrl + this.props.cookies.email).then(
            (data) => {
                console.log("DATA", data);
                this.setState({newUsers : data.data.newUsers});
                this.setState({activeUsers: data.data.activeUsers});
            }
        )
        
        // return data.data;
    }

    async componentDidMount(){
       await this.getCardDeatils();
    }

    render() {
        
        
        return (
             <Box sx={{ display: 'flex', justifyContent: "center"}} height="100vh" style={style}>
                <CssBaseline></CssBaseline>
                <AdminNavBar></AdminNavBar>
                <Sidebar></Sidebar>
                <Box
                    container direction="row"
                    component="main"
                    alignItems="center"
                    sx={{ flexGrow: 1, p: 3, pt:8, width: { sm: `calc(100% - ${240}px)`, mt:9, justifyContent: "center" }}}
                    // className="background-area"
                >
                    <Toolbar />
                    
                        
                        
                    <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    >
                        <Grid item>
                            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                    
                            </Typography>
                            
                        </Grid>
                    </Grid>
                     
                    {/* <Divider sx={{ pt:5 }} /> */}
                    <Grid container direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    sx={{ pt: 5 }}
                    >
                        <Grid item> <MainPageCard heading='Total Active User' count={this.state.activeUsers}></MainPageCard></Grid>
                        <Grid item><MainPageCard heading='Pending Application' count={this.state.newUsers}></MainPageCard></Grid>
                        <Grid item><MainPageCard heading='Active Users' count={this.state.activeUsers}></MainPageCard></Grid>
                    </Grid>
                </Box>
             </Box>
           
        );

    }
}


function MainPage(props){
    const [cookies] = useCookies(['admin']);
    console.log("COOKIE", cookies.email)
    if (cookies.email ==null){
        return (
            <>
            <ErrorNotFound> </ErrorNotFound>
            </>
        )
    }
    else{

        return (
            <>
            <MainPageCMP cookies={cookies}></MainPageCMP>
            </>
        );
    }
}

export default MainPage;