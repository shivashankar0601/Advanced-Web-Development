import { Avatar, Grid, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageFrom";
import {
  sendMessageRoute,
  recieveMessageRoute,
  deleteMessageRoute,
} from "../utils/APIRoutes";

const Message = ({ sender, receiver, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const scrollRef = useRef();
  const userName = receiver.firstname;
  const users = {
    sender,
    receiver,
  };
  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.post(recieveMessageRoute, {
        sender: sender._id,
        receiver: receiver.id,
      });
      setMessages(response.data);
    };
    getMessages();
  }, [receiver.id]);

  const addMessageHandler = async (message) => {
    const response = await axios.post(sendMessageRoute, {
      receiver: receiver.id,
      message: message,
      sender: sender._id,
      image: false,
    });
    socket.current.emit("send-msg", {
      to: receiver.id,
      from: sender._id,
      message,
      image: false,
      id: response.data.id,
    });
    const msgs = [...messages];
    msgs.push({
      fromSelf: true,
      id: response.data.id,
      message: message,
      image: false,
    });
    setMessages(msgs);
  };

  const addImageHandler = async (message) => {
    const response = await axios.post(sendMessageRoute, {
      receiver: receiver.id,
      message: message[0],
      sender: sender._id,
      image: true,
    });

    socket.current.emit("send-msg", {
      to: receiver.id,
      from: sender._id,
      message: message[0],
      image: true,
      id: response.data.id,
    });

    const msgs = [...messages];
    msgs.push({
      fromSelf: true,
      id: response.data.id,
      message: message[0],
      image: true,
    });
    setMessages(msgs);
  };

  const deleteMessageHandler = async (message) => {
    const newList = messages.filter((item) => item.id !== message.id);
    setMessages(newList);
    const socketPayload = {
      to: users.receiver.id,
      from: users.sender._id,
      message: null,
      image: message.image,
      delete: true,
      id: message.id,
    };
    socket.current.emit("send-msg", socketPayload);
    await axios.delete(`${deleteMessageRoute}/${message.id}`);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (data) => {
        if (data.delete) {
          setDeleteMessage(data);
        } else {
          setArrivalMessage({
            fromSelf: false,
            message: data.message,
            image: data.image,
            id: data.id,
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (deleteMessage) {
      const newList = [];
      messages.map((item) => {
        if (item.id === deleteMessage.id) {
          if (deleteMessage.image) {
            item.message = "This image is deleted..........";
            item.image = false;
          } else {
            item.message = "This message is deleted..........";
          }
          const newItem = { ...item, color: true };
          newList.push(newItem);
        } else {
          newList.push(item);
        }
      });
      setMessages(newList);
    }
  }, [deleteMessage]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <Grid
      container
      sx={{
        height: "100%",
      }}
    >
      <Grid
        item
        md={12}
        xs={12}
        sm={12}
        sx={{
          backgroundColor: "#40c4ff",
          display: "flex",
          alignItems: "center",
          height: "10%",
        }}
      >
        <Avatar
          sx={{
            marginLeft: "10px",
          }}
        />
        <Typography style={{ fontWeight: "bold", marginLeft: "20px" }}>
          {userName}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        sm={12}
        sx={{
          height: "78%",
          overflow: "auto",
          backgroundColor: "#e0e0e0",
        }}
        ref={scrollRef}
      >
        {messages.length > 0 && (
          <MessageList
            messages={messages}
            socket={socket}
            users={users}
            onDeleteMessage={deleteMessageHandler}
          />
        )}
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        sm={12}
        sx={{
          height: "10%",
        }}
      >
        <SendMessageForm
          onSendMessage={addMessageHandler}
          onSendImage={addImageHandler}
        />
      </Grid>
    </Grid>
  );
};

export default Message;
