//Author: Fenil Milankumar Parmar || BannerId: B00895684


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Posts from './Posts';
import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import { Box, Grid } from '@mui/material';

function PostFeed() {
    const [searchBy, setSearchBy] = React.useState('');
    const [profiles, setProfiles] = React.useState([]);
    const [tempProfiles, setTempProfiles] = React.useState([]);
    
    // const baseUrl = "http://127.0.0.1:3001";
    const baseUrl = process.env.REACT_APP_BASEURL;
    const url = baseUrl + "feed/posts";
    
    

    useEffect(() => {
        fetchAllData();
    }, []);

    // var allData = [];

    const fetchAllData = () => {
        axios.get(`${url}`)
            .then((response) => {
                const allData = response.data.posts;
                setProfiles(allData);
                setTempProfiles(allData);
            })
            .catch(error => console.error(`Error: ${error}`));
    }

    const onSumbit = () => {
        const newPosts = profiles.filter((profile) => profile.name.toLowerCase().indexOf(searchBy.toLowerCase()) > -1);
        // setPosts(newPosts);
        setTempProfiles(newPosts);
    }

    return (
        <Box sx={{ height: "100%", marginBottom: "10%" }}>
            <Box sx={{ height: "10%", display: 'flex', justifyContent: "center" }}>
                <Grid container spacing={1} sx={{ width: "20%" ,justifyContent: "center" }}>
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
                            label="Search By Item Name"
                        />
                    </Grid>
                    <Grid item md={3} sx={{ marginTop: '2.5%',  width: "10%" }}>
                        <Button variant="outlined" size='large' onClick={onSumbit}>Go</Button>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ height: "90%" }}>
                <Posts profiles={tempProfiles} />
            </Box>

        </Box>
    );
}

export default PostFeed;
