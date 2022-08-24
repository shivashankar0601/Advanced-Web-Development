import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import {
  host,
  getUserHistory,
} from "../utils/APIRoutes";
import axios from "axios";
import { io } from "socket.io-client";
import Search from "./Search.js";
import Grid from "@mui/material/Grid";
import MessageBar from "./MessageBar.js";
import Message from "./Message.js";
import { Alert, Box, Typography } from "@mui/material";

const Chatbar = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [cookies] = useCookies(["user"]);
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [sender, setSender] = useState(undefined);
  const [receiver, setReceiver] = useState(undefined);
  const [arrayOfUser, setArrayOfUser] = useState([]);
  useEffect(() => {
    const getUserInfo = async () => {
      const email = cookies.email;
      const data = await axios.get(`${host}/auth/profile/${email}`);
      const currentUser = {
        _id: data.data.user._id,
        firstname: data.data.user.firstname,
        lastname: data.data.user.lastname,
        email: data.data.user.email,
      };

      setSender(currentUser);
    };

    getUserInfo();
  }, []);

  useEffect(() => {
    if (sender) {
      socket.current = io(host);
      socket.current.emit("add-user", sender._id);
    }
  }, [sender]);

  useEffect(() => {
    const getContacts = async () => {
      if (sender) {
        const data = await axios.post(`${getUserHistory}/${sender._id}`);
        if (data.data.length>0) {
          setContacts(data.data[0]);
          setArrayOfUser(data.data[0]);
        }
      }
    };
    getContacts();
  }, [sender]);

  const handleShowMessage = (user) => {
    setShowMessage(user.flag);
    setReceiver(user);
  };

 

  const filterChangeHandler = (value) => {
    const newArray = contacts.filter((user) => {
      return user.firstname.toLowerCase().includes(value.toLowerCase());
    });
    setArrayOfUser(newArray);
  };

  const userError = (
    <Alert variant="outlined" severity="info" sx={{justifyContent:"center"}}>
      User not found
    </Alert>
  );

  return (
    <Grid
      container
      spacing={1}
      sx={{ height: "90%", width: "100%", minHeight: "70%" }}
    >
      <Grid item sm={3} xs={12} md={3} sx={{ height: "100%", width: "100%" }}>
        <Box style={{ height: "10%" }}>
          <Search onChangeFilter={filterChangeHandler} />
        </Box>
        <Box
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            height: "8%",
            paddingTop: "10px",
            backgroundColor: "#80d8ff",
          }}
        >
          <Typography style={{ fontWeight: "bold" }}>Your chats</Typography>
        </Box>
        <Box style={{ height: "82%",backgroundColor: "#e0e0e0" }}>
          {arrayOfUser.length === 0
            ? userError
            : arrayOfUser.map((user) => (
                <MessageBar
                  key={user._id}
                  onShowMessage={handleShowMessage}
                  userDetail={user}
                />
              ))}
        </Box>
      </Grid>
      <Grid item sm={9} xs={12} md={9} sx={{ height: "100%", width: "100%" }}>
        {showMessage && (
          <Message sender={sender} receiver={receiver} socket={socket} />
        )}
      </Grid>
    </Grid>
  );
};

export default Chatbar;