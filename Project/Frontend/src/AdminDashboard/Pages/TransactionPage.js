/* 
Authors : Dhruvkumar Patel
*/
import React from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Sidebar from "../Components/sidebar";
import AdminNavBar from "../Components/Navbar";
import { CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import axios from "axios";

const baseURL = "https://peaceful-brushlands-56321.herokuapp.com"
const transactionUrl = baseURL + "/admin/transactions";
class TableCmp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            rows : []
        }
    }

    render(){
        console.log("TABLE ", this.props.transactions);
        return(
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Receiver Email</TableCell>
                            <TableCell>Sender Email</TableCell>
                            <TableCell>TimeStamp</TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {this.props.transactions.map((transaction, index) => {
                            return (

                            <TableRow  key={index}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>{index}</TableCell>
                            <TableCell>{transaction.receiverEmail}</TableCell>
                            <TableCell>{transaction.senderEmail}</TableCell>
                            <TableCell>{transaction.transactionTimeStamp}</TableCell>
                            </TableRow>
                            )
                            
                         })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

class TransactionPage extends React.Component{
    async getTransactions(){
        var data =  axios.get(transactionUrl).then(
            (data) => {
                console.log("DATA", data)
                this.setState({transactionRecords : data.data.transactions});
            }
        )
        
        // return data.data;
    }
    constructor(props){
        super(props);
        this.state = {
            transactionRecords: []
        }
    }

    async componentDidMount(){
        var data = await this.getTransactions()
    
    }
    render() {
        console.log(this.state.transactionRecords)
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
                       <TableCmp transactions={this.state.transactionRecords}></TableCmp>
                        
                    </Grid>
                </Box>
                
             </Box>
           
        );

    }
}

export default TransactionPage;