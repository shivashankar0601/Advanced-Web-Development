import React from 'react'
import { Grid, Paper, Avatar, Button, Typography, Link } from "@mui/material"
import TextField from '@mui/material/TextField';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import Tooltip from '@mui/material/Tooltip';
import { useCookies } from "react-cookie";
import "../style.css";

const baseUrl = "https://peaceful-brushlands-56321.herokuapp.com";
const loginUrl = baseUrl + "/auth/forget";
const Forgotpassword = () => {
    const [cookies] = useCookies(['user']);
    const paperStyle = {
        padding: '30px 20px',
        height: "50vh",
        width: 600,
        margin: "auto",
    
      };
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const initialValues = {
        email: '',
        securityAns: ''
    }


    
    const getSessionCookies = () => {
        console.log("getting session cookies")  
        console.log(cookies.email)
      }
    const validateCredentials =(values) =>{
        console.log(values.email, values.password)
      }
    
    const onSubmit = (values, props) => {
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 2000)

        const fetchdata = async (values)=> {
            var response = fetch(loginUrl, { 
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({email: values.email, answer: values.securityAns})
            })
            .then((response)=> {return response.json()})
            .then((data)=>{
              if (data.valid) {alert("Your New Password is:" + data.newPassword );} 
              else{

                alert("Login Failed, Please enter correct details!");
                
              }
              
            });
            return await response;
          }
          fetchdata(values);
       
        console.log(values)
       

    }
console.log(getSessionCookies())
    return (
        <Grid className={"ContentArea"} display="flex">
            <Paper style={paperStyle} className="login-card11" display="flex">
                <Grid align='center'>
                    <Avatar style={avatarStyle}> <LockResetOutlinedIcon /></Avatar>

                    <h2>Forgot Password</h2>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} >
                    {(props) => (
                        <Form>
                           

                            <Field as={TextField} label='Email' name='email'
                                placeholder="Enter registered email address" fullWidth required
                                helperText={<ErrorMessage name="email" />}
                            />

                            <b>Security Question: What is your Fav Colour?</b> 

                            <Field as={TextField} fullWidth name="securityAns" label='securityAns'
                                placeholder="Enter your Security Answer" helperText={<ErrorMessage name="securityAns" />} />

                            <Tooltip title="Submit">
                                <Button type='submit' color='primary' variant="contained" 
                                    style={btnstyle} fullWidth>{props.isSubmitting ? "Sending..." : "Submit"}</Button>
                            </Tooltip>
                            <Typography >
                                <Link href="/">
                                    Back...
                                </Link>
                            </Typography>

                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>

    )
}

export default Forgotpassword
