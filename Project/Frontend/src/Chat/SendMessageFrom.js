import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import AttachmentRoundedIcon  from '@mui/icons-material/AttachmentRounded';
import SendIcon from "@mui/icons-material/Send";

const SendMessageForm = (props) => {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.length !== 0) {
      props.onSendMessage(message);
      setMessage("");
    }
  };

  const [openState, setOpenState] = useState(false);

  const handleOpen = () => {
    setOpenState(true);
  };

  const handleClose = () => {
    setOpenState(false);
  };

  const handleSave = (file) => {
    setOpenState(false);
    const buildBase64 = async () => {
      const response = await Promise.all(file.map(async (file) => fileToBase64(file)));
      props.onSendImage(response)
    };
    buildBase64();
  };

  const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const urltoBase64 = (url) =>
  new Promise((resolve) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        resolve(new File([blob], { type: blob.type }));
      });
  });


  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", paddingBottom: "10px" }}
    >
      <Button onClick={handleOpen} sx={{backgroundColor: "#e0e0e0"}} startIcon={<AttachmentRoundedIcon  fontSize="large"/>}/>
      <DropzoneDialog
        open={openState}
        onSave={handleSave}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
        filesLimit={1}
      />
      <TextField
        hiddenLabel
        id="filled-hidden-label-normal"
        placeholder="Type here"
        variant="filled"
        onChange={handleChange}
        value={message}
        fullWidth
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        endIcon={<SendIcon />}
      />
    </Box>
  );
};

export default SendMessageForm;
