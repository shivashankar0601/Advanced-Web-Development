//Author: Fenil Milankumar Parmar || BannerId: B00895684

import react from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import { maxHeight } from '@mui/system';

function Profile(props) {

    const [curUser, setCurUser] = useState('');
    let { id } = useParams();
    let navigate = useNavigate();

    // const url = "https://tutorial4-api.herokuapp.com/api/users/" + id;//Last Working
    const url = "http://127.0.0.1:3001/auth/profile/" + id;

    axios.get(`${url}`)
        .then((response) => {
            const userData = response.data.data;
            console.log(userData);
            setCurUser(userData);
        })

        .catch(error => console.error(`Error: ${error}`));

    return (
        <div className='posts'>

            <center>
                <h1>Profile Page</h1>
                <Card sx={{ maxWidth: 350 }}>
                    <CardHeader
                        title={curUser.firstName}
                    />
                    <Divider />
                    <CardMedia
                        component="img"
                        // height="250"
                        // image={curUser.picture}
                        image={"https://raw.githubusercontent.com/11fenil11/DataAboutProject/main/UserProfilePhoto.jpg"}                                    
                        alt="Paella dish"
                    />
                    <Divider />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            <b>{curUser.firstname} {curUser.lastname}</b>
                        </Typography>
                        <Divider />
                        <Typography variant="body2">
                            <b>Email:</b> {curUser.email}
                        </Typography>
                        <Divider />
                        <h3>Click below to see all profiles.</h3>
                        <div>
                            <center>
                                <Button variant="contained"
                                    onClick={() => {
                                        { navigate("/feed/profiles") }
                                    }}

                                >Show Profile Feed</Button> </center>
                        </div>
                    </CardContent>
                </Card>
            </center>
        </div>
    );
}

export default Profile;
