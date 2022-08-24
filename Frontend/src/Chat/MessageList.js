import { Box, Card, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { deleteMessageRoute } from "../utils/APIRoutes";
import axios from "axios";

const Div = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
}));

const MessageList = ({ messages, socket, users, onDeleteMessage }) => {
  const [initialMessage, setInitialMessage] = useState([]);

  useEffect(() => {
    setInitialMessage(messages);
  }, [messages]);

  return (
    <ul className="message-list">
      {initialMessage.map((message) => {
        // const deleteMessageHandler = async (message) => {
        //   console.log(message);
        //   console.log(messages);
        //   console.log(initialMessage);
        //   const newList = initialMessage.filter(
        //     (item) => item.id !== message.id
        //   );
        //   setInitialMessage(newList);
        //   const socketPayload = {
        //     to: users.receiver.id,
        //     from: users.sender._id,
        //     message: null,
        //     image: message.image,
        //     delete: message.id,
        //   };
        //   socket.current.emit("send-msg", socketPayload);
        //   await axios.delete(`${deleteMessageRoute}/${message.id}`);
        // };

        return (
          <Box
            key={message.id}
            sx={{
              margin: "10px 10px 0px 0px",
              backgroundColor: "#e0e0e0",
            }}
            fullWidth
            display="flex"
            justifyContent={message.fromSelf ? "right" : "left"}
            alignContent={message.fromSelf ? "right" : "left"}
          >
            {message.image ? (
              <Card sx={{ width: 200, height: 200 }}>
                <img
                  src={message.message}
                  alt={message.id}
                  loading="lazy"
                  width="200"
                  height="200"
                />
              </Card>
            ) : (
              <Card
                sx={{
                  width: "50%",
                  backgroundColor: message.color ? "#bdbdbd" : "white",
                  fontStyle: message.color && "italic",
                  borderColor: "black",
                }}
                border={1}
              >
                <Div>
                  <Typography>{message.message}</Typography>
                </Div>
              </Card>
            )}
            {message.fromSelf && (
              <ClearIcon
                cursor="pointer"
                //onClick={() => deleteMessageHandler(message)}
                onClick={() => onDeleteMessage(message)}
              />
            )}
          </Box>
        );
      })}
    </ul>
  );
};

export default MessageList;
