/*
Authors : Chirag Pancholi , Dhruvkumar Patel
*/

import React from "react";

import { Grid, Paper, Avatar, Button, Typography, Link, Card } from "@mui/material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./adminAuthStyle.css"



const baseUrl = "https://peaceful-brushlands-56321.herokuapp.com";
const loginUrl = baseUrl + "/admin/signin";
const AdminLogin = ({ handleChange }) => {

  const [cookies, setCookie] = useCookies(['admin']);
  const navigate = useNavigate();
  const paperStyle = {
    padding: '30px 20px',
    height: "50vh",
    width: 600,
    margin: "auto",

  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  const setSessionCookies = (values) => {
    console.log("setting session cookies", values.buildingNo)
    setCookie('email', values.email, { path: '/' });
    setCookie('buildingNo', values.buildingNo, { path: '/' });
  }

  const getSessionCookies = () => {
    console.log("getting session cookies")  
    console.log("MY COOKIE", cookies.email, cookies.buildingNo)
  }
  const validateCredentials =(values) =>{
    console.log(values.email, values.password)
  }
  const onSubmit = (values, props) => {

    console.log(values)
    
    
    validateCredentials(values);
    const fetchdata = async (values)=> {
      var response = fetch(loginUrl, { 
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, /',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: values.email, password: values.password})
      })
      .then((response)=> {return response.json()})
      .then((data)=>{
        if (data.valid) {navigate("/dashboard"); setSessionCookies({email: values.email, buildingNo: data.buildingNo});} 
        else{
          alert("Login Failed, Please enter correct credentials!")
        }
        
      }).then((data) => {getSessionCookies()});
      return await response;
    }
    fetchdata(values);
    
    
  };
  return (
    <Grid className="background-area" display="flex">
      
      <Paper style={paperStyle} className="login-card11">
        <Grid align="center" >
          <Avatar style={avatarStyle}>
            {" "}
            <AdminPanelSettingsIcon />
          </Avatar>

          <h2>Admin Login Panel</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          
        >
          {(props) => (
            <Form>
             
              <Field
                as={TextField}
                label="email"
                name="email"
                placeholder="Enter email address"
                fullWidth
                required
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                label="Password"
                name="password"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={FormControlLabel}
                name="remember"
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
              <Tooltip title="Login">
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={props.isSubmitting}
                  style={btnstyle}
                  fullWidth
                >
                  {props.isSubmitting ? "Loading" : "Sign in"}
                </Button>
              </Tooltip>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default AdminLogin;
