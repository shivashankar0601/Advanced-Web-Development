/*
    Author: Shiva Shankar Pandillapalli
    Banner: B00880049
    Feature: Posts
    Task: Creating a post with all functionalities like adding pictures, inforamtion of the post etc
*/

import {
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Button,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
// import DragDropZone from "./DragDropZone";
import FileUpload from "@hawk-ui/file-upload";
// import UploadImage from "./UploadImage";

import "./posts.css";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import Alert from "../Alerts/Alert";

import { useCookies } from "react-cookie";
import baseURL from "../utils/configuration";
import Validations from "./Validations";

const CreatePost = () => {
    const [cookies] = useCookies(["user"]);

    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        description: "",
        name: "",
        unitType: "",
        quantity: "",
        availability: "",
        condition: "",
        images: "",
        validForm: false,
    });

    const [fields, setFields] = useState({
        name: "",
        description: "",
        unitType: "",
        quantity: "",
        availability: "",
        condition: "",
        images: [],
    });

    if (cookies.email === undefined) {
        Alert({
            icon_name: "warning",
            message: "Unauthenticated user, please authenticate yourselves.",
            time: 5000,
        });
        return <Navigate to="/" />;
    }

    const handleFieldsChange = (e) => {
        const { currentTarget: input } = e;
        let fieldsObj = { ...fields };
        if (input === undefined || input === null)
            fieldsObj[e.target.name] = e.target.value;
        else fieldsObj[input.name] = input.value;
        setFields(fieldsObj);
    };

    const onFileUploaded = (acceptedImages) => {
        let vals = { ...fields };
        Array.from(acceptedImages).map((image) => {
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = (res) => {
                vals.images.push(res.target.result);
                setFields(vals);
            };
            return true;
        });
    };

    const handleCreate = (event) => {
        let result = Validations(fields);
        if (!result.validForm) {
            setErrors(result);
        } else {
            axios
                .get(baseURL + "/auth/profile/" + cookies.email)
                .then((res) => {
                    fields.firstName = res.data.user.firstname;
                    fields.lastName = res.data.user.lastname;
                    fields.email = res.data.user.email;
                    fields.address =
                        res.data.user.buildingNo + " ," + res.data.user.address;

                    axios
                        .post(baseURL + "/posts/create", fields)
                        .then((res) => {
                            Alert({
                                icon_name: "success",
                                message: res.data.message,
                                time: 5000,
                            });

                            navigate("/user/profile/" + cookies.email);
                        })
                        .catch((error) => {
                            Alert({
                                icon_name: "error",
                                message:
                                    "You have an error in your recent post",
                                time: 5000,
                            });
                        });
                })
                .catch((error) => {
                    console.log("problem with fetching user profile ", error);
                });
        }
    };

    return (
        <div className="container">
            <h3 style={{ paddingLeft: "25px" }}>Create Post</h3>
            <Divider variant="middle" style={{}} />
            <div style={{ paddingLeft: "25px", marginTop: "15px" }}>
                <TextField
                    id="name"
                    name="name"
                    label="Item Name :"
                    variant="outlined"
                    placeholder="Ex: Organic Apples"
                    fullWidth
                    value={fields.name}
                    onChange={handleFieldsChange}
                />
                {errors.name.length > 0 && (
                    <div
                        className="alert alert-danger"
                        style={{
                            //   marginLeft: "10px",
                            padding: "7px",
                            textAlign: "center",
                            marginTop: "5px",
                        }}
                    >
                        {errors.name}
                    </div>
                )}
            </div>
            <div style={{ paddingLeft: "25px", marginTop: "15px" }}>
                <TextField
                    id="description"
                    name="description"
                    label="Item Description :"
                    multiline
                    rows={4}
                    placeholder="Ex: Organically grown apples at home in the backyard"
                    fullWidth
                    value={fields.description}
                    onChange={handleFieldsChange}
                />
                {errors.description.length > 0 && (
                    <div
                        className="alert alert-danger"
                        style={{
                            //   marginLeft: "10px",
                            padding: "7px",
                            textAlign: "center",
                            marginTop: "5px",
                        }}
                    >
                        {errors.description}
                    </div>
                )}
            </div>
            <div style={{ paddingLeft: "25px", marginTop: "15px" }}>
                <TextField
                    id="unitType"
                    name="unitType"
                    label="Units Type:"
                    variant="outlined"
                    placeholder="EX: Dozens"
                    sx={{ width: "40%" }}
                    value={fields.unitType}
                    onChange={handleFieldsChange}
                />

                <FormControl
                    sx={{
                        marginLeft: "2%",
                        width: "18%",
                    }}
                >
                    <InputLabel id="itemQuantityLabel">
                        Item Quantity:
                    </InputLabel>
                    <Select
                        labelId="itemQuantityLabel"
                        name="quantity"
                        value={fields.quantity}
                        label="Item Quantity :"
                        placeholder="Ex: 2"
                        onChange={handleFieldsChange}
                        sx={{ backgroundColor: "#fff !important" }}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5 or more</MenuItem>
                    </Select>
                </FormControl>

                <FormControl
                    sx={{
                        marginLeft: "2%",
                        width: "18%",
                    }}
                >
                    <InputLabel id="availabilityLabel">Available:</InputLabel>
                    <Select
                        labelId="availabilityLabel"
                        name="availability"
                        value={fields.availability}
                        label="Availability :"
                        onChange={handleFieldsChange}
                        sx={{ backgroundColor: "#fff !important" }}
                    >
                        <MenuItem value={1}>Free</MenuItem>
                        <MenuItem value={2}>Borrow</MenuItem>
                    </Select>
                </FormControl>

                <FormControl
                    sx={{
                        marginLeft: "2%",
                        width: "18%",
                    }}
                >
                    <InputLabel id="conditionLabel">Condition:</InputLabel>
                    <Select
                        labelId="conditionLabel"
                        name="condition"
                        value={fields.condition}
                        label="Condition :"
                        onChange={handleFieldsChange}
                        sx={{ backgroundColor: "#fff !important" }}
                    >
                        <MenuItem value={1}>New/Fresh</MenuItem>
                        <MenuItem value={2}>Used</MenuItem>
                        <MenuItem value={3}>Dead/Not Working</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {errors.unitType.length > 0 && (
                <div
                    className="alert alert-danger"
                    style={{
                        //   marginLeft: "10px",
                        padding: "7px",
                        textAlign: "center",
                        marginLeft: "25px",
                        marginTop: "5px",
                    }}
                >
                    {errors.unitType}
                </div>
            )}
            {errors.quantity.length > 0 && (
                <div
                    className="alert alert-danger"
                    style={{
                        //   marginLeft: "10px",
                        padding: "7px",
                        textAlign: "center",
                        marginLeft: "25px",
                        marginTop: "5px",
                    }}
                >
                    {errors.quantity}
                </div>
            )}
            {errors.availability.length > 0 && (
                <div
                    className="alert alert-danger"
                    style={{
                        //   marginLeft: "10px",
                        padding: "7px",
                        textAlign: "center",
                        marginLeft: "25px",
                        marginTop: "5px",
                    }}
                >
                    {errors.availability}
                </div>
            )}
            {errors.condition.length > 0 && (
                <div
                    className="alert alert-danger"
                    style={{
                        //   marginLeft: "10px",
                        padding: "7px",
                        textAlign: "center",
                        marginLeft: "25px",
                        marginTop: "5px",
                    }}
                >
                    {errors.condition}
                </div>
            )}
            <div style={{ paddingLeft: "25px", marginTop: "15px" }}>
                {fields.images !== undefined && fields.images !== null && (
                    <div
                        className="images-area row"
                        style={{ display: "inline-flex" }}
                    >
                        {/* <Stack spacing={2} direction="row"> */}
                        {Array.from(fields.images).map((image) => (
                            <div className="col" key={image}>
                                <img
                                    src={image}
                                    style={{ width: "100px", height: "100px" }}
                                    alt={"Not found"}
                                />
                                <p>{image.name}</p>
                            </div>
                        ))}
                        {/* </Stack> */}
                    </div>
                )}

                <FileUpload
                    title="Drag and Drop Image Here"
                    description="Supported file types: (*.png, *.jpg, *.jpeg). View format instructions."
                    variant="draggable"
                    isLoading
                    onUpload={onFileUploaded}
                />
            </div>
            {errors.images.length > 0 && (
                <div
                    className="alert alert-danger"
                    style={{
                        //   marginLeft: "10px",
                        padding: "7px",
                        textAlign: "center",
                        marginLeft: "25px",
                        marginTop: "5px",
                    }}
                >
                    {errors.images}
                </div>
            )}
            <div
                className="d-flex justify-content-center"
                style={{ paddingLeft: "25px", marginTop: "15px" }}
            >
                <Stack
                    spacing={5}
                    direction="row"
                    sx={{ width: "fit-content" }}
                >
                    <Button
                        sx={{ backgroundColor: "black", color: "white" }}
                        variant="contained"
                        onClick={handleCreate}
                    >
                        Create
                    </Button>
                    <Button
                        sx={{ backgroundColor: "gray", color: "white" }}
                        variant="contained"
                        onClick={() => {
                            navigate("/feed/posts");
                        }}
                    >
                        Cancel
                    </Button>
                </Stack>
            </div>
        </div>
    );
};

export default CreatePost;
