//Author: Fenil Milankumar Parmar || BannerId: B00895684

import react, { Fragment } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate, Navigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Navbar from "../Navbar/Navbar";
import { margin } from "@mui/system";
import Like from "../Alerts/Like";
import { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "./../utils/configuration";
import { useCookies } from "react-cookie";

function Posts(props) {
    let navigate = useNavigate();

    const [cookies] = useCookies(["admin"]);

    const [likedPosts, setLikedPosts] = useState();

    useEffect(() => {
        if (cookies.email === undefined) {
            return <Navigate to="/" />;
        } else {
            axios
                .get(baseURL + "/like/" + cookies.email)
                .then((res) => {
                    setLikedPosts(res.data.likedPosts);
                })
                .catch((error) => console.log(error));
        }
    });

    const handleLike = (postId, liked) => {
        axios
            .put(baseURL + "/like/update", {
                email: cookies.email,
                postId: postId,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => console.log(error));
        // console.log(postId, liked);
    };

    return (
        <div className="posts">
            {/* <center> */}
            <Box sx={{ flexGrow: 1, margin: "2% 10% 10% 10%" }}>
                <Grid container spacing={4}>
                    {props.profiles.map((profile, i) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                            <Card
                                sx={{
                                    maxWidth: "auto",
                                    maxHeight: "auto",
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height={"200"}
                                    // image={profile.picture}
                                    image={profile.images[0]}
                                    alt="Image not found"
                                    onClick={() => {
                                        navigate("/posts/view", {
                                            state: { id: profile._id },
                                        });
                                    }}
                                />
                                <CardContent>
                                    <div
                                        onClick={() => {
                                            navigate("/posts/view", {
                                                state: { id: profile._id },
                                            });
                                        }}
                                    >
                                        {/* <Typography gutterBottom variant="h4" component="div"> */}
                                        <Typography gutterBottom>
                                            <b> {profile.name}</b>
                                        </Typography>
                                        <Divider />
                                        {/* <Typography gutterBottom variant="h6" component="div" className='head2'> */}
                                        <Typography gutterBottom>
                                            <b>
                                                {" "}
                                                {profile.firstName}{" "}
                                                {profile.lastName}
                                            </b>
                                        </Typography>
                                        {/* <Typography gutterBottom variant="p" component="div"> */}
                                        <Typography gutterBottom>
                                            <b>Description:</b>
                                            {profile.description}
                                        </Typography>
                                        <Divider />
                                        {/* <Typography variant="body2" className="head"> */}
                                        <Typography gutterBottom>
                                            <b>Address:</b> {profile.address}
                                        </Typography>
                                        {/* <Typography gutterBottom>
                                            <b>Condition:</b>{" "}
                                            {profile.condition}
                                        </Typography>
                                        <Typography gutterBottom>
                                            <b>Availability:</b>{" "}
                                            {profile.availability}
                                        </Typography> */}
                                        <Typography gutterBottom>
                                            <b>Quantity:</b> {profile.quantity}
                                        </Typography>
                                    </div>

                                    <Like
                                        liked={likedPosts.includes(profile._id)}
                                        handleLike={handleLike}
                                        postId={profile._id}
                                    />
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

export default Posts;
