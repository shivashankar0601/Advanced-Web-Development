import React from "react";

import axios from "axios";
import { Grid, Paper, Avatar, Button, Typography, Link } from "@mui/material";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { render } from "@testing-library/react";
import "./userAuthlogin.css"
import "../style.css";
import {
  host,
} from "../../utils/APIRoutes";

const baseUrl = "https://peaceful-brushlands-56321.herokuapp.com";
const loginUrl = baseUrl + "/auth/signin";
const Login = ({ handleChange }) => {

  const [cookies, setCookie] = useCookies(['user']);
  const navigate = useNavigate();
  const paperStyle = {
    padding: '30px 20px',
    height: "55vh",
    width: 600,
    margin: "0  auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  const setSessionCookies = async (values) => {
    console.log("setting session cookies")
    const data = await axios.get(`${host}/auth/profile/${values.email}`);    
    setCookie('user', data.data);
    setCookie('email', values.email, { path: '/' });
  }

  const getSessionCookies = () => {
    console.log("getting session cookies")  
    console.log(cookies.email)
  }
  const validateCredentials =(values) =>{
    console.log(values.email, values.password)
  }
  const onSubmit = (values, props) => {


    // console.log(values)
    
    getSessionCookies()
    validateCredentials(values);
    const fetchdata = async (values)=> {
      var response = fetch(loginUrl, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify({email: values.email, password: values.password})
      })
      .then((response)=> {return response.json()})
      .then((data)=>{
        if (data.valid) {navigate("/feed/posts"); setSessionCookies(values);} 
        else{
          setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 2000)
          alert("Login Failed, Please enter correct details!");
          
        }
        
      });
      return await response;
    }
    fetchdata(values);
    
    
  };

  
  return (
    
    <Grid className="background-area" display="flex">
    
    <Paper style={paperStyle} className="login-card11">
        <Grid align="center">
          <Avatar style={avatarStyle}>
            {" "}
            <LoginRoundedIcon />
          </Avatar>

          <h2>Sign In</h2>
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
                  // disabled={props.isSubmitting}
                  style={btnstyle}
                  fullWidth
                >
                  {props.isSubmitting ? "Loading" : "Sign in"}
                </Button>
              </Tooltip>
            </Form>
          )}
        </Formik>
        <Typography>
          <Link href="/forgotpassword">Forgot password? Click here.</Link>
        </Typography>
        <Typography>
          {" "}
          Don't have an account ?
          <Link href="#" onClick={() => handleChange("event", 1)}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
