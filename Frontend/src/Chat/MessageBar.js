import React from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

function generate(element) {
  return [0].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Messagebar = (props) => {
  const userdetail = props.userDetail;

  const messageHandler = () => {
    const user = {
      ...userdetail,
      flag: true,
    };
    props.onShowMessage(user);
  };
  return (
    <Grid item xs={12} md={6}>
      <List>
        {generate(
          <ListItem>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              onClick={messageHandler}
              primary={userdetail.firstname}
            />
          </ListItem>
        )}
      </List>
    </Grid>
  );
};

export default Messagebar;
