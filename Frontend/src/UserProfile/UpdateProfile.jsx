import {
    Divider,
    Stack,
    Button,
  } from "@mui/material";
  import TextField from "@mui/material/TextField";
  import { useState } from "react";
  import { useCookies } from "react-cookie";
  
  
  import Alert from "../Alerts/Alert";
  const baseUrl = "https://peaceful-brushlands-56321.herokuapp.com";
  const updateUrl = baseUrl + "/auth/profile";
  const UpdateProfile = () => {
    const [cookies] = useCookies(['user']);
    // Alert({ icon_name: "warning", message: "check your posts quantity" });
    const initialState = {
      fileNames: [],
    };
    const getSessionCookies = () => {
      console.log("getting session cookies")  
      console.log(cookies.email)
    }
    
    const [fields, setFields] = useState({
      firstname: "",
      lastname: "",
      phoneNumber: "",
      address: "",
      buildingNo: "",
    });
  const submitHandler=()=>{
    console.log(cookies.email);
    if(cookies.email){
    fetch(updateUrl, { 
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, /',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:cookies.email, firstname: fields.firstname, lastname: fields.lastname, phoneNumber:fields.phoneNumber, address:fields.address , buildingNo:fields.buildingNo})
      }).then((response)=> {return response.json()}).then(data=>console.log(data))
      alert("Profile updated successfully!");
    }
  }
      
  const handleFieldsChange = (e) => {
      const { currentTarget: input } = e;
      let fieldsObj = { ...fields };
      if (input === undefined || input === null)
        fieldsObj[e.target.name] = e.target.value;
      else fieldsObj[input.name] = input.value;
      setFields(fieldsObj);
    };
  
    
  
    return (
      <div className="container">
        <h3 style={{ paddingLeft: "25px" }}>Update Profile</h3>
        <Divider variant="middle" style={{}} />
        <div style={{ paddingLeft: "25px", marginTop: "15px" }}>
          <TextField
            id="firstname"
            name="firstname"
            label="First Name :"
            variant="outlined"
            placeholder="First Name"
            sx={{ width: "70%" }}
            fullWidth
            value={fields.firstname}
            onChange={handleFieldsChange}
          />
        </div>
        <div style={{ paddingLeft: "25px", marginTop: "15px" }}>
          <TextField
            id="lastname"
            name="lastname"
            label="Last Name :"
            variant="outlined"
            placeholder="Lastname"
            sx={{ width: "70%" }}
            fullWidth
            value={fields.lastname}
            onChange={handleFieldsChange}
          />
        </div>
        <div style={{ paddingLeft: "25px", marginTop: "15px" }}>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="PhoneNumber:"
            variant="outlined"
            placeholder="PhoneNumber"
            sx={{ width: "70%" }}
            value={fields.phoneNumber}
            onChange={handleFieldsChange}
          />
          </div>

          <div style={{ paddingLeft: "25px", marginTop: "15px" }}>
          <TextField
            id="address"
            name="address"
            label="Address:"
            variant="outlined"
            placeholder="Address"
            sx={{ width: "70%" }}
            value={fields.address}
            onChange={handleFieldsChange}
          />
          </div>

          <div style={{ paddingLeft: "25px", marginTop: "15px" }}>
          <TextField
            id="buildingNo"
            name="buildingNo"
            label="BuildingNo:"
            variant="outlined"
            placeholder="BuildingNo"
            sx={{ width: "70%" }}
            value={fields.buildingNo}
            onChange={handleFieldsChange}
          />
          </div>
        <div
          className="d-flex justify-content-center"
          style={{ paddingLeft: "25px", marginTop: "15px" }}
        >
          <Stack spacing={5} direction="row" sx={{ width: "fit-content" }}>
            <Button
              sx={{ backgroundColor: "black", color: "white" }}
              variant="contained"
              onClick={()=>submitHandler()}
            >
              Update
            </Button>
            <Button
              sx={{ backgroundColor: "gray", color: "white" }}
              variant="contained"
              
            >
              Cancel
            </Button>
          </Stack>
        </div>
  
      </div>
    );
  };
  
  export default UpdateProfile;
  