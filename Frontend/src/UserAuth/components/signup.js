import React from 'react'
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import { Grid, Paper, Avatar, Typography, TextField, Button } from "@mui/material"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
// import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

const baseUrl = "https://peaceful-brushlands-56321.herokuapp.com";
const signupUrl = baseUrl + "/auth/signup";
const Signup = (props) => {
    // const navigate = useNavigate();
    const paperStyle = {padding: '30px 20px',
    height: 'auto',
    width: 600,
    margin: "0  auto"}
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        buildingNumber: '',
        address: '',
        securityAns: '',
        password: '',
        confirmPassword: '',

    }

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid name').min(3, "It's too short").required("Required"),
        lastname: Yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid name').min(3, "It's too short").required("Required"),
        email: Yup.string().email("Enter valid email").required("Required"),
        phoneNumber: Yup.number().typeError("Enter valid Phone Number").required('Required'),
        password: Yup.string().min(8, "Password minimum length should be 8").required("Required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required"),
        securityAns: Yup.string().required("Required"),
        buildingNumber: Yup.string().required("Required")
    })
    const signUpUser = (values) => {
        fetch(signupUrl, 
            {method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
             body:JSON.stringify(values)})
             .then((response) => {
                if(response.status == 200){
                    alert("Your application is now with admin, Check after sometime for the access");
                }else{
                    alert("Your application cannot be submitted.");
                }
                })
            
        }
        
    const onSubmit = (values, props) => {
        console.log("ONSUBMIT", values);
        
        signUpUser(values)
        setTimeout(() => {

            props.resetForm()
            props.setSubmitting(false)
        }, 2000)

    }
    return (
        <Grid>
            <Paper style={paperStyle} >
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <HowToRegRoundedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <Formik initialValues={initialValues} validationSchema={validationSchema}  onSubmit={onSubmit}>
                    {(props) => (
                        <Form>
                            <Field as={TextField} fullWidth name="firstname" label='FirstName'
                                placeholder="Enter your First-name" helperText={<ErrorMessage name="Firstname" />} />

                            <Field as={TextField} fullWidth name="lastname" label='LastName'
                                placeholder="Enter your Last-name" helperText={<ErrorMessage name="Lastname" />} />

                            <Field as={TextField} fullWidth name="email" label='Email'
                                placeholder="Enter your email" helperText={<ErrorMessage name="email" />} />

                            <Field as={TextField} fullWidth name="phoneNumber" label='Phone Number'
                                placeholder="Enter your phone number" helperText={<ErrorMessage name="phoneNumber" />} />

                            <Field as={TextField} fullWidth name="buildingNumber" label='Building Number'
                                placeholder="Enter your Building Numberr" helperText={<ErrorMessage name="buildingNumber" />} />   

                            <Field as={TextField} fullWidth name="address" label='address'
                                placeholder="Enter your Address" helperText={<ErrorMessage name="address" />} />    

                            <Field as={TextField} fullWidth name='password' type="password"
                                label='Password' placeholder="Enter your password"
                                helperText={<ErrorMessage name="password" />} />

                            <Field as={TextField} fullWidth name="confirmPassword" type="password"
                                label='Confirm Password' placeholder="Confirm your password"
                                helperText={<ErrorMessage name="confirmPassword" />} />

                            <b>Security Question: What is your Fav Colour?</b> 

                            <Field as={TextField} fullWidth name="securityAns" label='securityAns'
                                placeholder="Enter your Security Answer" helperText={<ErrorMessage name="securityAns" />} />

                            <Tooltip title="SignUp">
                                <Button type='submit' variant='contained' 
                                    color='primary'>{props.isSubmitting ? "Loading" : "Sign up"}</Button>
                            </Tooltip>
                        </Form>
                    )}
                </Formik>

            </Paper>
        </Grid>
    )
}

export default Signup;
