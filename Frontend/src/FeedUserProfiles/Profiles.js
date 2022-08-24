//Author: Fenil Milankumar Parmar || BannerId: B00895684

import react from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import Divider from '@mui/material/Divider';

function Profiles(props) {

    let navigate = useNavigate();

    return (
        <div className='posts'>
            {/* <center> */}
            <Box sx={{ flexGrow: 1, margin:"2% 10% 10% 10%" }}>
                <Grid container spacing={4}>
                    {props.posts.map((post, i) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                            <Card sx={{ maxWidth: 'auto',
                                     maxHeight: 'auto' }} onClick={()=>{
                                        // {navigate("/userinventory/"+post.id)}
                                        {navigate("/user/profile/"+post.email)}
                                    }}>
                                <CardMedia
                                    component="img"
                                    // height={300}
                                    height={'200'}                                
                                    // image={post.picture}
                                    image={"https://raw.githubusercontent.com/11fenil11/DataAboutProject/main/UserProfilePhoto.jpg"}                                    
                                    // image={"https://xsgames.co/randomusers/avatar.php?g=male"}//RandomPhotoGenerator
                                    alt="Post Picture"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        <b>{post.firstname} {post.lastname}</b>
                                    </Typography>
                                    <Divider />
                                    <Typography variant="body2" className='head'>
                                        <b>Email:</b> {post.email}
                                    </Typography>                                    
                                                                              
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            {/* </center> */}
        </div>
    );
}

export default Profiles;
