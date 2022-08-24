/* 
Authors : Dhruvkumar Patel 
*/
import React from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from "../Components/sidebar";
import AdminNavBar from "../Components/Navbar";
import { Button, CardActions, CardContent, Grid, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import "../styles/newUsers.css"
import { useCookies } from "react-cookie";
import ErrorNotFound from "./error404";

const baseURL = "https://peaceful-brushlands-56321.herokuapp.com/"
const acceptURL = baseURL + "admin/application/accept";
const rejectURL = baseURL + "admin/application/reject";
const getApplicationUrl =  baseURL + "admin/applications"
const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30vw'   
  };


function AcceptModal(props){
    const refreshPage = () => {
        window.location.reload(false);
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [cookies] = useCookies(['admin']);
    const handleAction = () => {
        props.acceptApplication(props.email);
        setOpen(false);
        refreshPage()
    }




    const handleClose = () => {
        setOpen(false);
    }

    return(
        <>
        
        <Button variant="outlined"  onClick={handleOpen} >Accept</Button>
            <Modal
            open={open}
            onClose={handleClose}
            className="modal-bg"
            >

            <div key={'Accept'} >
                <Card variant="outlined" className="modal-bg-card" sx={style}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Accept User's Application
                        </Typography>
                        <Typography variant="h5" component="div">
                            Id: {props.email}
                        </Typography >
                        <Divider sx={{ pt:1 }}  className="divider-bg" />
                        <CardActions alignItems="center" display="flex">
                            <Button  onClick={handleAction} className="accept">Confirm</Button>
                        </CardActions>
                    </CardContent>
                    
                </Card>
            
            </div>
            </Modal>

        </>
    )
}


function RejectModal(props){
    const refreshPage = () => {
        window.location.reload(false);
    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleAction = () => {
        props.rejectApplication(props.email);
        setOpen(false);
        refreshPage();
    }
    const handleClose = () => {
        setOpen(false);

    }
    return(
        <>
        
        <Button variant="outlined"  onClick={handleOpen} color="warning" >Reject</Button>
            <Modal
            open={open}
            onClose={handleClose}
            className="modal-bg"
          
            >
            <div key={'Accept'}>
                <Card variant="outlined" sx={style} className="modal-bg-card">
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Reject User's Application
                        </Typography>
                        <Typography variant="h5" component="div">
                            Id: {props.email}
                        </Typography >
                        <Divider sx={{ pt:1 }}  className="divider-bg" />
                        <CardActions>
                            <Button size="small" variant="outlined" onClick={handleAction} className="reject">Confirm</Button>
                        </CardActions>
                    </CardContent>
                    
                </Card>
                
            
            </div>
            </Modal>

        </>
    )
}


class TableCmp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            rows : []
        }
    }

    render(){
        
        return(
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Contact No.</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.applications.map(application => {
                            return (
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={application.email}>
                                    <TableCell>{application.firstname}</TableCell>
                                    <TableCell>{application.lastname}</TableCell>
                                    <TableCell>{application.email}</TableCell>
                                    <TableCell>{application.address}</TableCell>
                                    <TableCell>{application.phoneNumber}</TableCell>
                                    <TableCell><AcceptModal 
                                                    email={application.email} acceptApplication={this.props.acceptApplication}></AcceptModal> 
                                                    | 
                                                            <RejectModal email={application.email} rejectApplication={this.props.rejectApplication}></RejectModal>
                                                </TableCell>
                            
                                </TableRow>
                            ) 
                        })}
                        
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}



class NewUsers extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            applications: []
        }
    }

    fetchApplications() {
        fetch(getApplicationUrl + "/" + this.props.cookies.buildingNo)
        .then((response) => { return response.json()})
        .then((data) => {console.log(data); return data})
        .then((data) => {this.setState({applications: data['applications']})})
    }

    componentDidMount(){
        this.fetchApplications();
    }
    
    rejectApplication(emailID){
        console.log("REJECTING APPLICATION", emailID);
        fetch(rejectURL, 
            {   method: 'post', 
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: emailID})
        })
        .then((response) => {console.log(response.json())});
        

    }

    acceptApplication(emailID){
        console.log("Accepting Application", emailID);
        fetch(acceptURL, 
            {   method: 'post', 
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: emailID})
        })
        .then((response) => {console.log(response.json())});
    }

    render() {
        return (
             <Box sx={{ display: 'flex'} } height="100vh" borderColor="grey.500">
                <CssBaseline></CssBaseline>
                <AdminNavBar></AdminNavBar>
                <Sidebar></Sidebar>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, pt:8, width: { sm: `calc(100% - ${240}px)`, mt:9 } }}
                >
                    <Toolbar />
                    <Grid container direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    >
                        <TableCmp 
                            applications={this.state.applications} 
                            acceptApplication={this.acceptApplication}
                            rejectApplication={this.rejectApplication}
                        ></TableCmp>
                        
                    </Grid>
                </Box>
                
             </Box>
           
        );

    }
}


function NewUsersPage(props){
    const [cookies] = useCookies(['admin']);
    console.log("COOKIE", cookies.email);
    if (cookies.email ==null){
        return(

            <ErrorNotFound></ErrorNotFound>
        )
    }
    else{

        return(
            <NewUsers cookies={cookies}> </NewUsers>
        )
    }
}

export default NewUsersPage;