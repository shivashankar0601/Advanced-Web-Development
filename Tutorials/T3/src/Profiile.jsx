import { useLocation, useParams } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const queryString = require("query-string");
  const { name, email } = queryString.parse(location.search);
  //   console.log(name, "*****", email);
  return (
    <section
      style={{
        backgroundColor: "#eee",
        minHeight: "100vh",
        padding: "5vh 0vh",
      }}
    >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="card mb-4">
                    <div className="card-body text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt="avatar"
                        className="rounded-circle img-fluid"
                        style={{
                          width: "150px",
                          border: "1px solid rgba(0, 0, 0, 0.125)",
                        }}
                      />
                      <h5 className="my-3">{name}</h5>
                      <p className="text-muted mb-1">{email}</p>
                      <p className="text-muted mb-4">
                        Welcome to CSCI 5709 Tutorial 3 Profile Page
                      </p>
                      {/* <div className="d-flex justify-content-center mb-2">
                        <button type="button" className="btn btn-primary">
                          Follow
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary ms-1"
                        >
                          Message
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
