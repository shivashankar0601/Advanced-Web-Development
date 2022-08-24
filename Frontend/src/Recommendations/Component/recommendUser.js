
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import "axios"
import axios from 'axios';
import { useCookies } from "react-cookie";
import "../Styles/style.css";
const baseURL = "https://peaceful-brushlands-56321.herokuapp.com/"
const recommendURL = baseURL + "recommend/recommend"

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 200,
    boxShadow: 24,
    p: 4,
  };
  

function ShareModal(props) {
  const [cookies] = useCookies(['user']);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [senderEmail, setSenderEmail] = React.useState("");

    const formSubmit = () =>{
        alert("SUBMITTING To", senderEmail);
        if(cookies.email == null){
          axios.post(recommendURL, 
             {
              postId: props.postId,
              senderEmail: senderEmail,
              userEmail: "shareIT@email.com"
             } );
        }else{
          axios.post(recommendURL, 
            {
             postId: props.postId,
             senderEmail: senderEmail,
             userEmail: cookies.email
            } );
        }
        setOpen(false);
    }


    return (
      <div>
        <Button onClick={handleOpen} className={"recommend-button"}>RECOMMEND</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="modal-bg">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              RecommendUser
            </Typography>
              <form>
                  <TextField id="outlined-basic" label="User Email" onChange={(e) => {
                      setSenderEmail(e.target.value);
                      }} 
                      variant="outlined" /><br></br>
                  <Button onClick={formSubmit} className={"form-submit-btn"}>Share</Button>
                  
                </form>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }


const RecommendUser = (props) => {
    return (
        <>
        <ShareModal postId = {props.postId}></ShareModal>
        </>
    )
}


export default RecommendUser;