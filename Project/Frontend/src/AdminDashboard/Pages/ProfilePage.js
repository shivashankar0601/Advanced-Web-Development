/* 
Author : Dhruvkumar Patel
*/
import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Sidebar from "../Components/sidebar";
import AdminNavBar from "../Components/Navbar";
import { Button, CardContent, Grid, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import { CardActions, Modal } from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";
import "../styles/profilePage.css";
import ErrorNotFound from "./error404";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
const baseURL = "https://peaceful-brushlands-56321.herokuapp.com/";
const adminProfileURL = baseURL + "admin/profile/";
const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

function UpdateProfileCard(props) {
  const refreshPage = () => {
    window.location.reload(false);
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [cookies] = useCookies(["admin"]);
  const submitForm = () => {
    console.log("STATE", props.state);
    props.updateProfile(cookies.email, props.state);
    setOpen(false);
    
  };

  const handleClose = () => setOpen(false);
  return (
    <>
      <Button onClick={handleOpen} className="form-submit-btn">
        Update
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-bg"
      >
        <div key={"Accept"}>
          <Card variant="outlined" sx={style} className="modal-bg-card">
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Update Profile
              </Typography>
              <Typography variant="h5" component="div"></Typography>
              <Divider sx={{ pt: 2 }} className={"divider-bg"} />
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={submitForm}
                >
                  Update
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </div>
      </Modal>
    </>
  );
}

class ProfileCardCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
    };
  }

  async getProfileDetail() {
    var data = await axios
      .get(adminProfileURL + this.props.cookies.email)
      .then((data) => {
        console.log("DATA", data);
        this.setState({ profile: data.data.profile });
      });
    return await data;
  }

  async componentDidMount() {
    let data = await this.getProfileDetail();
    console.log("PROFILE", data);
  }

  render() {
    return (
      <React.Fragment>
        {/* variant="outlined" */}
        <Card sx={{ width: "75%" }} className="profile-card">
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Box
                  component="img"
                  className="profile-image-border"
                  sx={{
                    height: 300,
                    width: 250,
                    maxHeight: { xs: 300, md: 300 },
                    maxWidth: { xs: 250, md: 250 },
                  }}
                  src="https://images.unsplash.com/photo-1529307474719-3d0a417aaf8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=760&q=80"
                />
              </Grid>
              <Grid item xs={6}>
                <Grid>
                  <Grid item xs={12}>
                    <Grid container pb={3} spacing={3} pt={5}>
                      <Grid item xs={4} >
                        {/* <TextField
                          name="name"
                          value={this.state.profile.name}
                          readOnly
                          variant="standard"
                        /> */}
                        <Typography variant="p" style ={{width: '100%'}}>
                        {this.state.profile.name}
                          </Typography> 
                      </Grid>

                      <Grid item xs={12}>
                        
                        <Typography variant="p">
                        {this.state.profile.address}
                          </Typography> 
                      </Grid>

                      <Grid item xs={12}>
                        
                        <Typography variant="p">
                        {this.state.profile.contactNo}
                          </Typography> 
                      </Grid>
                    </Grid>

                    <Grid container pt={8}>
                      <Grid item>
                        <strong>Building Admin:</strong> 112
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

class ProfileUpdateCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  checkNameValue(value) {
    if (value == null) {
      return true;
    }
    return false;
  }

  updateProfile(email, profileData) {
    console.log("COOKIE EMAIL", email);
    axios.put(adminProfileURL + email, profileData).then((resp) => {
      console.log(resp);
    });
  }

  render() {
    return (
      <React.Fragment>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minWidth: "500px" }}
        >
          <Grid item>
            <Card variant="outlined" sx={{ width: "100%" }}>
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      id="profile-form-name"
                      label="Name"
                      name="name"
                      value={this.state.name}
                      onChange={(event) => this.handleChange(event)}
                      helperText=""
                      required
                      o
                      variant="standard"
                    />

                    <TextField
                      id="profile-form-address"
                      label="Address"
                      name="address"
                      value={this.state.address}
                      onChange={(event) => this.handleChange(event)}
                      helperText=""
                      variant="standard"
                    />
                    <TextField
                      id="profile-form-contact"
                      label="Contact No."
                      name="contactNo"
                      value={this.state.contactNo}
                      onChange={(event) => this.handleChange(event)}
                      helperText=""
                      variant="standard"
                    />
                    <br></br>
                    <UpdateProfileCard
                      updateProfile={this.updateProfile}
                      state={this.state}
                    ></UpdateProfileCard>
                    {/* <Button variant="contained" disableElevation pt={10}>Update</Button> */}
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

class ProfilePageCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "TEMP",
    };
  }
  async getUserProfile() {
    //return data.data;
  }
  async componentDidMount() {
    var data = await this.getUserProfile();
  }
  render() {
    return (
      <Box sx={{ display: "flex" }} height="100vh">
        <CssBaseline></CssBaseline>
        <AdminNavBar></AdminNavBar>
        <Sidebar></Sidebar>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            pt: 3,
            width: { sm: `calc(100% - ${240}px)`, mt: 2, height: 1.0 },
          }}
          className="conent-area-profile"
        >
          <Toolbar />
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ mb: 4 }}
          >
            <ProfileCardCmp
              name={this.state.name}
              cookies={this.props.cookies}
            ></ProfileCardCmp>
          </Grid>
          <Divider className="page-divider"></Divider>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ pt: 4 }}
          >
            <Typography variant="h4" component="h4">
              Update Profile
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ pt: 4 }}
          >
            <ProfileUpdateCmp></ProfileUpdateCmp>
          </Grid>
        </Box>
      </Box>
    );
  }
}

const ProfilePage = () => {
  const [cookies] = useCookies(["admin"]);
  console.log("COOKIE", cookies.email);
  if (cookies.email == null) {
    return <ErrorNotFound></ErrorNotFound>;
  } else {
    return <ProfilePageCmp cookies={cookies}> </ProfilePageCmp>;
  }
};

export default ProfilePage;
