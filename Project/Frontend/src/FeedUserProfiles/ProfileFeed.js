//Author: Fenil Milankumar Parmar || BannerId: B00895684

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import Posts from './Posts';
import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import Profiles from "./Profiles";
import { Box, Grid } from '@mui/material';

function ProfileFeed() {
  const [searchBy, setSearchBy] = React.useState('');
  const [posts, setPosts] = React.useState([]);
  const [tempPosts, setTempPosts] = React.useState([]);

  // const url = "https://raw.githubusercontent.com/11fenil11/DataAboutProject/main/dataProfiles";//Last Working
  // const url = "http://127.0.0.1:3001/feed/profiles";
  const baseUrl = process.env.REACT_APP_BASEURL;
  const url = baseUrl+"feed/profiles";

  useEffect(() => {
    fetchAllData();
  }, []);

  // var allData = [];

  const fetchAllData = () => {
    axios.get(`${url}`)
      .then((response) => {
        const allData = response.data.user;
        console.log(allData);
        setPosts(allData);
        setTempPosts(allData);
      })
      .catch(error => console.error(`Error: ${error}`));
  }

  const onSumbit = () => {
    const newPosts = posts.filter((post) => post.firstname.toLowerCase().indexOf(searchBy.toLowerCase()) > -1 || post.lastname.toLowerCase().indexOf(searchBy.toLowerCase()) > -1);
    // setPosts(newPosts);
    setTempPosts(newPosts);
  }

  return (

    <Box sx={{ height: "100%", marginBottom: "10%" }}>
      <Box sx={{ height: "10%", display: 'flex', justifyContent: "center" }}>
        <Grid container spacing={1} sx={{ width: "20%", justifyContent: "center" }}>
          <Grid item md={9} sx={{ height: "10%", width: "90%" }}>
            <TextField
              value={searchBy}
              name="searchBy"
              // class="search"
              id={searchBy}
              onChange={(e) => setSearchBy(e?.target?.value)}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  onSumbit()
                }
              }}
              label="Search By Profile Name"
            />
          </Grid>
          <Grid item md={3} sx={{ marginTop: '2.5%', width: "10%" }}>
            <Button variant="outlined" size="large" onClick={onSumbit}>Go</Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ height: "90%" }}>
        <Profiles posts={tempPosts} />
      </Box>

    </Box>
  );
}

export default ProfileFeed;
