//Author: amankumar Manojkumar Patel || BannerId: B00888136




import React, { useEffect, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css";
import { useParams } from "react-router-dom";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios';
const StarFeedback = () => {
  
  const [ratingValue, setRatingValue] = useState(0)
  const navigate = useNavigate();
  const itemId = useParams();
  function handleSubmit() {
    console.log("here");
    var select = document.getElementById('starRating');
    var value = select.options[select.selectedIndex].value;
    
    
    var select1 = document.getElementById('exampleInputEmail1').value;
    console.log(select1);


    console.log(process.env.REACT_APP_BASEURL);
   
    axios.post(process.env.REACT_APP_BASEURL+'feedback/add/'+itemId.id,{stars:value,
    details:select1})
    navigate("/user/review/view/"+itemId.id)
  }
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    console.log(editorState);
  }, [editorState]);

  return (
    <Fragment>

      <div className='all '>

        <div className='starr'>

          <h1 className='head'>Give Ratings</h1>

          <div className='kontent'>
            <div className='col'>
              <div className='justify-content-center'>

                <label>Give star ratings:</label>

              </div>
              <form>
                <select name="starRating" id="starRating">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Feedback</label>
                  <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Camera"/>
                  <small id="emailHelp" className="form-text text-muted">We'll share the details on the feedback page.</small>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                  <label className="form-check-label" htmlFor="exampleCheck1">Check me out if the details are correct</label>
                </div>

                <div className='col text-center'>
                  <button type="button" className="btnnnn justify-content-center" onClick={() => {
                    handleSubmit()
                  }}>Rate It!</button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </Fragment>
  )
}

export default StarFeedback;