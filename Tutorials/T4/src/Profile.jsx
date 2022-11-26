import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

const Profile = () => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState();
  // debugger;
  if (
    location.state.id !== null &&
    location.state.id !== undefined &&
    (userInfo === null || userInfo === undefined)
  ) {
    axios
      .get("https://tutorial4-api.herokuapp.com/api/users/" + location.state.id)
      .then((res) => {
        setUserInfo(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // return <>Profile of {location.state.id}</>;
  return (
    userInfo !== null &&
    userInfo !== undefined && (
      <>
        <h2 className="text-center" style={{ padding: "8px 0px" }}>
          User Profile Details
        </h2>
        <div
          className="text-center col p-2 flex-column container bg-white"
          style={{
            height: "calc(100vh - 186.5px)",
            // padding: "10% 20%",
            border: "2px solid rgba(0,0,0,0.2",

            marginTop: "10px",
            marginBottom: "10px",
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          <div style={{ paddingTop: "35px" }}></div>
          <img
            src={userInfo.picture}
            alt="Admin"
            className="rounded-circle p-1 bg-primary mt-2"
            width="240"
          />

          <div className="mt-3">
            <div className="row d-flex pt-2 pb-2">
              <div>
                <span style={{ fontWeight: "bold", fontSize: "24px" }}>
                  Uniqe ID:
                </span>
                <span style={{ fontSize: "24px" }}>{" " + userInfo.id}</span>
              </div>
            </div>

            <div className="row d-flex pt-2 pb-2">
              <div>
                <span style={{ fontWeight: "bold", fontSize: "24px" }}>
                  Title:
                </span>
                <span style={{ fontSize: "24px" }}>{" " + userInfo.title}</span>
              </div>
            </div>

            <div className="row d-flex pt-2 pb-2">
              <div>
                <span style={{ fontWeight: "bold", fontSize: "24px" }}>
                  First Name:
                </span>
                <span style={{ fontSize: "24px" }}>
                  {" " + userInfo.firstName}
                </span>
              </div>
            </div>

            <div className="row d-flex pt-2 pb-2">
              <div>
                <span style={{ fontWeight: "bold", fontSize: "24px" }}>
                  Last Name:
                </span>
                <span style={{ fontSize: "24px" }}>
                  {" " + userInfo.lastName}
                </span>
              </div>
            </div>

            <div className="row d-flex pt-2 pb-2">
              <div>
                <span style={{ fontWeight: "bold", fontSize: "24px" }}>
                  Email:
                </span>
                <span style={{ fontSize: "24px" }}>{" " + userInfo.email}</span>
              </div>
            </div>

            {/* <p className="text-muted font-size-sm">Halifax, Canada</p> */}
          </div>
        </div>
      </>
    )
  );
};

export default Profile;
