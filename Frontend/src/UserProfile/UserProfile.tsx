//Author: amankumar Manojkumar Patel || BannerId: B00888136



import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useCookies } from 'react-cookie';
const UserProfile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const itemId = useParams();
    var userId = itemId.id;

    const fetchData1 = async () => {
        setLoading1(true);
        try {
            // +itemId.id
            console.log(itemId.id);
            const { data: response } = await axios.get(process.env.REACT_APP_BASEURL + 'feed/posts/' + itemId.id);
            console.log(response.posts)
            setData1(response.posts);

        } catch (error) {
            console.error(error.message);
        }
        setLoading1(false);
    };

    const [loading1, setLoading1] = useState(true);
    const [data1, setData1] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log(itemId.id);
                const { data: response } = await axios.get(process.env.REACT_APP_BASEURL + 'auth/profile/' + itemId.id);
                console.log(response.user)
                setData(response.user);
                

            } catch (error) {
                console.error(error.message);
            }
            
            setLoading(false);
        };
        const fetchData1 = async () => {
            setLoading1(true);
            try {
                // +itemId.id
                console.log(itemId.id);
                const { data: response } = await axios.get(process.env.REACT_APP_BASEURL + 'feed/posts/' + itemId.id);
                console.log(response.posts)
                setData1(response.posts);

            } catch (error) {
                console.error(error.message);
            }
            setLoading1(false);
        };

        fetchData();
        fetchData1();
        
    }, []);



    var rows = [1, 2, 3];
    const [cookies] = useCookies(['user']);
    const chatHandler = async () => {
        const emailId = cookies.email;
        const sender = await axios.get(process.env.REACT_APP_BASEURL + 'auth/profile/' + emailId);
        const senderRequest = {
            sender: sender.data.user._id,
            receiver: data._id,
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname
        }
        await axios.post(process.env.REACT_APP_BASEURL + 'chat/addUsersHistory/', senderRequest);

        console.log(sender.data.user)
        const recieverRequest = {
            sender: data._id,
            receiver: sender.data.user._id,
            email: sender.data.user.email,
            firstname: sender.data.user.firstname,
            lastname: sender.data.user.lastname
        }
        await axios.post(process.env.REACT_APP_BASEURL + 'chat/addUsersHistory/', recieverRequest);



        navigate("/chat");
    }

    let itemlists = rows.map((item, index) => {
        return <div className="card justify-content-center">
            <div className="card-body">
                <h5 className="card-title">Camera</h5>
                <button type="button" className="btnn btn-danger" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                </svg></button>
                <button type="button" onClick={() => { navigate("/posts/update") }} className="btnn btn-success" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                </svg></button>
                <p className="card-text">I baught a new camera i am ready to rent it on daily basis.</p>
                <p className="card-text">Price: 10$/day</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            </div>
            <img className="card-img-bottom" src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2020/08/10/fn_red-onions-getty_s4x3.jpg.rend.hgtvcom.826.620.suffix/1597096320410.jpeg" height={'100px'} alt="Card image cap"></img>
        </div>

    })
    function ChkUsr3() {
        if (itemId.id === cookies.email){}
        else{
            return <button type="button" className="btnnnn" onClick={() => navigate("/user/review/" + userId)}>Give Feedback</button>
    
        }
            }
    function ChkUsr() {
        if (itemId.id === cookies.email)
            return <button type="button" className="btnnnn" onClick={() => navigate("/UserProfile/UpdateProfile/")}>Update Profile</button>
    }
    function ChkUsr4() {
        if (itemId.id === cookies.email){

        }else{
            return <button className="open-button" onClick={() => chatHandler()}>Chat</button>
        }
            
    }
    function ChkUsr1(item) {
        if (itemId.id === cookies.email)
            return <><button type="button" onClick={() => {
                axios.post(process.env.REACT_APP_BASEURL + "posts/delete", {
                    postId: item._id
                });
                setTimeout(function () {
                    window.location.reload();
                }, 200);
                // window.location.reload();
            } }
                className="btnn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                </svg></button><button type="button" onClick={() => {
                    navigate("/posts/update", {
                        state: {
                            id: item._id
                        }
                    });


                } } className="btnn btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                    </svg></button></>
    }

    return (
        <Fragment>
            <div className='page'>

                <div className="card" >
                    <div className="card-body">
                        <h1 className="head">User Profile</h1>
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-7">
                                <div className="text-center">
                                    <img src="https://i.imgur.com/bDLhJiP.jpg" width="100" className="rounded-circle"></img>
                                </div>
                                <div className="text-center mt-3">
                                    <h5 className="p">{data.firstname} {data.lastname}</h5>
                                    <span className="p">{data.buildingNo}, {data.address}</span>
                                    <div className="p">
                                        <p className="p">Contact Details: {data.phoneNumber} </p>
                                    </div>
                                </div>


                                

                            </div>
                        </div>
                        <div className='col text-center'>
                            {ChkUsr3()}
                            <button type="button" className="btnnnn" onClick={() => navigate("/user/review/view/" + userId)}>Show Feedback</button>
                            <button type="button" className="btnnnn" onClick={() => navigate("/user/inv/" + userId)}>Inventory</button>

                            {ChkUsr()}
                        </div>
                    </div>
                    {ChkUsr4()}
                </div>
                {/* {itemlists} */}
                {
                    data1.map(item => (
                        <div className="card justify-content-center">
                            <div className="card-body ">
                                <h5 className="card-title text-dark">{item.name}</h5>
                                {ChkUsr1(item)}
                                <p className="card-text">{item.description}</p>
                                <p className="card-text">Availability: {item.availability}/{item.quantity}</p>
                                <p className="card-text"><small className="text-muted">posted on: {item.postedTime}</small></p>
                            </div>
                            <img className="card-img-bottom" src={item.images[0]} height={'100px'} alt="Card image cap"></img>
                        </div>
                    ))
                }
            </div>
        </Fragment>
    )
}
export default UserProfile;