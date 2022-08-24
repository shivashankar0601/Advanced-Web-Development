//Author: amankumar Manojkumar Patel || BannerId: B00888136


import React, { Fragment, useState } from 'react';
import {  useNavigate} from 'react-router-dom' ;
import { Rating } from 'react-simple-star-rating'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import "./styles.css";
import Swal from 'sweetalert2';

const SuccessFeedback=() => {
  const [ratingValue, setRatingValue] = useState(0)
  const navigate = useNavigate();
  const handleRating = (rate: number) => {
    setRatingValue(rate)
  }

  Swal.fire({
    title: 'Hooray ! Your feedback has been added',
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
  return (
    <Fragment>
    
    <div className='all '>
      <div className='starr'>
      <h1 className='head'>Feedback Added </h1>
                    <p className="card-text">The service was too good</p>
                    <p className="card-text">Stars; 4/5</p>

                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> 
                    <div className='col text-center'>
                            <button type="button" className="btnnnn" onClick={() => navigate("/user/profile")}>Back</button>
                           
                        </div>
      </div>
    </div>
    </Fragment>
  )
}

export default SuccessFeedback;