/*
    Author: Shiva Shankar Pandillapalli
    Banner: B00880049
    Feature: Posts
    Task: Viewing the contents of a post
*/

import Alert from "../Alerts/Alert";
import "bootstrap/dist/css/bootstrap.css";
import { Grid, Button, TextField } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import baseURL from "../utils/configuration";
import { useStateValue } from "../Payment/StateContext";
import RecommendUser from "../Recommendations/Component/recommendUser";
import { useParams } from "react-router-dom";
import ErrorNotFound from "../AdminDashboard/Pages/error404";
import { host } from "../utils/APIRoutes";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

// const baseURL = "https://peaceful-brushlands-56321.herokuapp.com/";

const ViewPost = () => {
    let { id } = useParams();
    const [{ formValues }, dispatch] = useStateValue();
    const fieldMaps = {
        quantity: { 1: "1", 2: "2", 3: "3", 4: "4", 5: "5 or more" },
        availability: { 1: "Free", 2: "Borrow" },
        condition: { 1: "New/Fresh", 2: "Used", 3: "Dead/Not Working" },
    };
    // console.log(id);
    const navigate = useNavigate();
    const [cookies] = useCookies(["user"]);
    const location = useLocation();
    const [fields, setFields] = useState({
        __v: 0,
        email: "",
        _id: "",
        availability: "",
        condition: "",
        description: "",
        images: [],
        name: "",
        postedTime: "",
        quantity: "",
        unitType: "",
        firstName: "",
        lastName: "",
    });

    const [amount, setAmount] = useState(0);

    const [itemData, setItemData] = useState([
        {
            img: "",
            title: "Breakfast",
        },
    ]);

    const [selectedImage, setSelectedImage] = useState(itemData[0]);

    if (cookies.email === undefined) {
        Alert({
            icon_name: "warning",
            message: "Unauthenticated user, please authenticate yourselves.",
            time: 5000,
        });
        return <Navigate to="/" />;
    }

    if (
        id === null &&
        (location.state === null || location.state.id === null)
    ) {
        Alert({
            icon_name: "warning",
            message:
                "Invalid post information received, kindly retry with valid post information.",
            time: 5000,
        });

        return <Navigate to="/" />;
    }

    if (
        id === undefined &&
        (location.state === undefined || location.state.id === undefined)
    ) {
        Alert({
            icon_name: "warning",
            message:
                "Invalid post information received, kindly retry with valid post information",
            time: 5000,
        });
        return <Navigate to="/" />;
    } else {
        // console.log(location.state.id);
        if (itemData.length > 0 && itemData[0].title) {
            // console.log("axios");
            axios
                .get(baseURL + "/posts/" + location.state.id)
                .then((res) => {
                    // console.log(res);

                    let tData = [];
                    for (let i = 0; i < res.data.result.images.length; i++) {
                        tData.push({ img: res.data.result.images[i] });
                    }
                    if (tData.length > 0) setSelectedImage(tData[0]);
                    setItemData(tData);
                    setFields(res.data.result);
                })
                .catch((error) => {
                    console.log(error);
                    Alert({
                        icon_name: "error",
                        message: "You have an error in your recent post",
                        time: 5000,
                    });
                });
        }
    }

    // Alert({
    //     icon_name: "question",
    //     message: "Have questions ? reachout to the owner ...",
    // });

    const chatHandler = async (data) => {
        const emailId = cookies.email;
        const sender = await axios.get(
            process.env.REACT_APP_BASEURL + "auth/profile/" + emailId
        );
        const senderRequest = {
            sender: sender.data.user._id,
            receiver: data._id,
            email: data.email,
            firstname: data.firstName,
            lastname: data.lastName,
        };
        await axios.post(
            process.env.REACT_APP_BASEURL + "chat/addUsersHistory/",
            senderRequest
        );

        // console.log(sender.data.user);
        const recieverRequest = {
            sender: data._id,
            receiver: sender.data.user._id,
            email: sender.data.user.email,
            firstname: sender.data.user.firstname,
            lastname: sender.data.user.lastname,
        };
        await axios.post(
            process.env.REACT_APP_BASEURL + "chat/addUsersHistory/",
            recieverRequest
        );

        navigate("/chat");
    };

    const paymentHandler = async () => {
        const data = await axios.get(`${host}/auth/profile/${fields.email}`);
        if (parseInt(amount) === 0) {
            alert("Please chat with seller for a further process.");
        } else {
            dispatch({
                type: "editFormValue",
                key: "amount",
                value: amount,
            });
            dispatch({
                type: "editFormValue",
                key: "email",
                value: fields.email,
            });
            const sellerName = fields.firstName + " " + fields.lastName;
            const productBuy = {
                sellerId: data.data.user._id,
                buyerId: cookies.user.user._id,
                id: location.state.id,
                name: fields.name,
                desc: fields.description,
                price: amount,
                sellerName,
            };
            dispatch({
                type: "addProduct",
                value: productBuy,
            });
            navigate("/checkout");
        }
    };

    return (
        fields && (
            <Box sx={{ width: "100%", height: "100%" }}>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    xs={12}
                    sx={{ height: "100vh" }}
                >
                    <Grid
                        item
                        xs={7}
                        container
                        direction="row"
                        sx={{ overflow: "hidden" }}
                    >
                        <Grid item xs={3} sx={{ overflow: "hidden" }}>
                            <Item>
                                <Box
                                    sx={{
                                        width: 200,
                                        height: "100vh",
                                        overflow: "scroll",
                                        backgroundColor: "white",
                                        "&:hover": {
                                            backgroundColor: "white",
                                            opacity: [0.9, 0.8, 0.7],
                                        },
                                    }}
                                >
                                    <ImageList
                                        // sx={{ width: 500, height: 450 }}
                                        cols={1}
                                        rowHeight={164}
                                    >
                                        {itemData.map((item) => (
                                            <ImageListItem key={item.img}>
                                                <img
                                                    // src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                                    src={item.img}
                                                    // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}

                                                    // loading="lazy"
                                                    style={{
                                                        cursor: "pointer",
                                                        width: 180,
                                                        height: 100,
                                                    }}
                                                    alt={"Not found"}
                                                    onClick={() =>
                                                        setSelectedImage(item)
                                                    }
                                                />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid
                            item
                            xs={9}
                            alignItems="center"
                            sx={{
                                verticalAlign: "middle",
                                justifyContent: "center",
                            }}
                        >
                            <Item>
                                <Box
                                    sx={{
                                        // width: "100% !important",
                                        height: "100vh",
                                        align: "right",

                                        backgroundColor: "white",
                                        "&:hover": {
                                            backgroundColor: "white",
                                            opacity: [0.9, 0.8, 0.7],
                                        },
                                    }}
                                >
                                    <Grid
                                        item
                                        xs={6}
                                        sx={{
                                            maxWidth: "100% !important",
                                            height: "100vh",
                                        }}
                                    >
                                        <img
                                            style={{
                                                padding: "25px",
                                                // width: ",
                                                width: "100%",
                                                height: "auto",
                                            }}
                                            align="center"
                                            // src={`${selectedImage.img}?w=600&h=600&fit=crop&auto=format`}
                                            // srcSet={`${selectedImage.img}?w=600&h=600&fit=crop&auto=format&dpr=2 2x`}
                                            src={selectedImage.img}
                                            alt={
                                                "This post does not have any images"
                                            }
                                        />
                                    </Grid>
                                </Box>
                            </Item>
                        </Grid>
                    </Grid>
                    <Grid item xs={5} sx={{ height: "100vh" }}>
                        <Item>
                            <Typography
                                variant="h4"
                                align="center"
                                gutterBottom
                                component="div"
                            >
                                {fields.name}
                            </Typography>
                            <Typography
                                variant="overline"
                                align="left"
                                paddingTop={"25px"}
                                display="block"
                            >
                                Description:{" "}
                            </Typography>
                            <Typography
                                variant="body2"
                                align="left"
                                gutterBottom
                                component="div"
                            >
                                {fields.description}
                            </Typography>
                            <Typography
                                variant="overline"
                                align="left"
                                paddingTop={"20px"}
                                display="block"
                            >
                                Item Availability:{" "}
                                {fieldMaps.availability[fields.availability]}
                            </Typography>
                            <Typography
                                variant="overline"
                                align="left"
                                paddingTop={"20px"}
                                display="block"
                            >
                                Available Qty:{" "}
                                {fieldMaps.quantity[fields.quantity]}
                            </Typography>

                            <Typography
                                variant="overline"
                                align="left"
                                paddingTop={"20px"}
                                display="block"
                            >
                                Unit Type: {fields.unitType}
                            </Typography>

                            <Typography
                                variant="overline"
                                align="left"
                                paddingTop={"20px"}
                                display="block"
                            >
                                Item Condition:{" "}
                                {fieldMaps.condition[fields.condition]}
                            </Typography>

                            <Typography
                                variant="overline"
                                align="left"
                                paddingTop={"20px"}
                                display="block"
                            >
                                Posted by:{" "}
                                {fields.firstName + " " + fields.lastName}
                            </Typography>

                            <Typography
                                variant="overline"
                                align="left"
                                paddingTop={"20px"}
                                display="block"
                            >
                                Posted on: {fields.postedTime}
                            </Typography>

                            <Typography
                                variant="overline"
                                align="left"
                                paddingTop={"20px"}
                                display="block"
                            >
                                Location: {fields.address}
                            </Typography>

                            <div className="align-items-center">
                                <Typography
                                    variant="body2"
                                    align="center"
                                    gutterBottom
                                    component="div"
                                    padding={"20px 0 10px 0"}
                                >
                                    wana chat with customer ?
                                </Typography>

                                <Button
                                    onClick={() => chatHandler(fields)}
                                    sx={{
                                        backgroundColor: "black",
                                        color: "white",
                                    }}
                                    variant="contained"
                                >
                                    Talk to{" "}
                                    {fields.firstName + " " + fields.lastName}
                                </Button>
                            </div>
                            <div className="align-items-center">
                                <Typography
                                    variant="body2"
                                    align="center"
                                    gutterBottom
                                    component="div"
                                    padding={"20px 0 10px 0"}
                                >
                                    Like this item ? wana share with your
                                    friends/family ? click below to share.
                                </Typography>
                                <div style={{ color: "#FFF" }}>
                                    <RecommendUser postId={location.state.id} />
                                </div>
                            </div>

                            <div className="align-items-center">
                                <Typography
                                    variant="body2"
                                    display="block"
                                    padding={"20px 0 10px 0"}
                                >
                                    Enter a price to pay a seller:{" "}
                                </Typography>
                                &nbsp;
                                <TextField
                                    required
                                    id="outlined-basic"
                                    name="price"
                                    label="Price"
                                    variant="outlined"
                                    value={fields.amount}
                                    onChange={(event) =>
                                        setAmount(event.target.value)
                                    }
                                />
                                <br />
                                <br />
                                <Button
                                    onClick={() => paymentHandler()}
                                    sx={{
                                        backgroundColor: "black",
                                        color: "white",
                                    }}
                                    variant="contained"
                                >
                                    {amount === 0 ? "Buy" : "Pay"}
                                </Button>
                            </div>

                            {/* <Stack spacing={5} direction="row" sx={{ alignItems: "center" }}>
            </Stack> */}
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        )
    );
};

export default ViewPost;
