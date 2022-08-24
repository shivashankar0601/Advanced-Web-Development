import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {
    allUsers,
    host,
    getUserHistory,
    addUserHistory,
} from "../utils/APIRoutes";
import axios from "axios";

function Rewards(props) {

    const [cookies] = useCookies(["user"]);
    const [user, setUser] = useState(undefined);


    const [searchBy, setSearchBy] = React.useState('');
    const [personalPoints, setPersonalPoints] = React.useState([]);
    const [allRewards, setAllRewards] = React.useState([]);
    const [leaderboard, setLeaderboard] = React.useState([]);
    // const baseUrl = "http://127.0.0.1:3001/";
    const baseUrl = process.env.REACT_APP_BASEURL;



    useEffect(() => {
        const getUserInfo = async () => {
            const email = cookies.email;
            const data = await axios.get(`${host}/auth/profile/${email}`);
            const user_id = data.data.user._id;
            const url = baseUrl + "reward/personal/" + user_id;

            console.log(user_id);
            console.log(url);
            axios.get(`${url}`)
                .then((response) => {
                    const allData = response.data.totalPoints;
                    console.log(allData);
                    setPersonalPoints(allData);
                })
                .catch(error => console.error(`Error: ${error}`));

            const url1 = baseUrl + "reward/all/" + user_id;
            console.log(url1);
            axios.get(`${url1}`)
                .then((response) => {
                    const allData = response.data.rewards;
                    console.log(allData);
                    setAllRewards(allData);
                })
                .catch(error => console.error(`Error: ${error}`));
            
            const url2 = baseUrl + "leaderboard/";
            console.log(url2);
            axios.get(`${url2}`)
                .then((response) => {
                    const allData = response.data.leaderBoard;
                    console.log(allData);
                    setLeaderboard(allData);
                })
                .catch(error => console.error(`Error: ${error}`));

        };
        getUserInfo();
    }, []);

    return (
        <div className='rewards'>


            <div class="container p-5 my-5 border bg-primary bg-gradient">
                <center>
                    <h1>{personalPoints}</h1>
                    <h3>Your Current Points</h3>
                </center>
            </div>
            <Container>
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Points Earned on Items</button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Leaderboard</button>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <table class="table table-striped table-responsive">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Gained Points</th>
                                <th>Time</th>
                            </tr>
                            </thead>
                            <tbody>
                            {allRewards.map((reward,i)=>(                            
                                    <tr>
                                        <td>{reward.itemId}</td>
                                        <td>{reward.points}</td>
                                        <td>{new Date(reward.postedTime * 1).toGMTString()}</td>
                                    </tr>                                
                            ))}                                                  
                            </tbody>
                        </table>
                    </div>
                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Username</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                            {leaderboard.map((leaderBoard,i)=>(                            
                                    <tr>
                                        <td>{i+1}</td>
                                        <td>{leaderBoard.userId}</td>
                                        <td>{leaderBoard.points}</td>                                        
                                    </tr>                                           
                            ))}                                                    
                            </tbody>                            
                        </table>
                    </div>
                    <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
                </div>

            </Container>
        </div>
    );
}

export default Rewards;
