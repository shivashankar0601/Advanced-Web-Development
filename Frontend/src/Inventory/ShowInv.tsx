//Author: amankumar Manojkumar Patel || BannerId: B00888136





import { useParams } from "react-router-dom";
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css";
import axios from 'axios';
import { useCookies } from 'react-cookie';
const ShowInv = () => {


  const navigate = useNavigate();
  var rows = [1, 2, 3];


  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])
  const itemId = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log(itemId.id);
        const { data: response } = await axios.get(process.env.REACT_APP_BASEURL + 'inventory/inv/get/' + itemId.id);
        console.log(response.Inventory)
        setData(response.Inventory);

      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, []);
  const [cookies] = useCookies(['user']);
  function ChkUsr() {
    if (itemId.id === cookies.email)
      return <button type="button" className="btnnnn" onClick={() => navigate("/user/inv/add/" + itemId.id)}>ADD</button>
  }
  let itemlists = rows.map((item, index) => {
    return <div className="card mb-3 " >
      <div className="card-header">Available between 1 A.M. - 12 P.M.</div>
      <div className="card-body">
        <h5 className="card-title">ITEM NAME</h5>
        <button type="button" className="btnn btn-danger" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
        </svg></button>

        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
    </div>
  })

  return (
    <Fragment>
      <div>
        <div className='all'>
          <h1 className='head'>Inventory List</h1>
          <p className='pmid text-center'>Here you can lookout the things and utilities I have right now.</p>
          <div className='col text-center'>
            {ChkUsr()}
          </div>
        </div>
        {
          data.map(item => (
            <div className="card mb-3 " >
              <div className="card-header">{item.itmName}</div>
              <div className="card-body">
                <h5 className="card-title text-dark">{item.price}$</h5>
                <button type="button" className="btnn btn-danger" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                </svg></button>

                <p className="card-text">{item.itmDetails}</p>
              </div>
            </div>
          ))}
        {/* {itemlists} */}

      </div>
    </Fragment>
  )
}

export default ShowInv;