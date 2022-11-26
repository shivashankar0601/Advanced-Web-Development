//Author: amankumar Manojkumar Patel || BannerId: B00888136



import { useParams } from "react-router-dom";
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css";
import Swal from 'sweetalert2';

const AddItem = () => {

    const [ratingValue, setRatingValue] = useState(0)
    const navigate = useNavigate();
    const itemId = useParams();
    
    const handleSubmit = () => {


        console.log("here");
        var name = document.getElementById('exampleInputEmail1').value;



        var desc = document.getElementById('exampleInputPassword1').value;
        var price = document.getElementById('exampleInputPassword2').value;

        console.log(name+desc+price);


        console.log(process.env.REACT_APP_BASEURL);

        axios.post(process.env.REACT_APP_BASEURL + 'inventory/inv/add/' + itemId.id, {
            email: itemId.id,
            details: desc.toString(),
            price: price.toString(),
            name: name.toString()
        })
        navigate("/user/inv/" + itemId.id)


        Swal.fire({
            title: 'Hooray ! Your item is been added in the list',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(/images/trees.png)',
            backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
        })
    }

    return (
        <Fragment>

            <div className="formm">
                <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">Add Item</h5>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Item Name</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Camera"></input>
                                <small id="emailHelp" className="form-text text-muted">We'll share the details on the feed.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Description</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="The camera has 3 lences..."></input>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Price</label>
                                <input type="text" className="form-control" id="exampleInputPassword2" placeholder="21$"></input>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out if the details are correct</label>
                            </div>

                            <div className='col text-center'>
                                <button type="button" className="btnnnn" onClick={() => handleSubmit()}>ADD</button>
                            </div>
                        </form>
                    </div>
                </div></div>
        </Fragment>
    )
}
export default AddItem;