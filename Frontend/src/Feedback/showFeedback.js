//Author: amankumar Manojkumar Patel || BannerId: B00888136


import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css";
import axios from 'axios';
import { useParams } from "react-router-dom";

const Showfeedback = () => {

    
    
    


    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const itemId = useParams();
    useEffect(() => {
      const fetchData = async () =>{
        setLoading(true);
        try {
           console.log(itemId.id);
          const {data: response} = await axios.get(process.env.REACT_APP_BASEURL+'feedback/get/'+itemId.id);
          console.log(response.feedbacks)
          setData(response.feedbacks);
          
        } catch (error) {
          console.error(error.message);
        }
        setLoading(false);
      }
  
      fetchData();
    }, []);
    return (
        <Fragment>
            <div>
                <div className='all'>
                    <h1 className='head'>Given Feedbacks</h1>
                    <p className='pmid text-center'>Here you can lookout the Feedbacks of the User.</p>
                </div>
{/* <h1>data is {data}</h1> */}
                {
                data.map(item => (
                    <div className="card mb-3 " >
                    <div className="card-body">
                        <h5 className="card-title text-dark">{item.stars}</h5>
                        <p className="card-text">{item.details}</p>
                    </div>
                </div>))}
                {/* {itemlists} */}

            </div>
        </Fragment>
    )
}

export default Showfeedback;