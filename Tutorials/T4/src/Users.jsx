import { useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";

const Users = (props) => {
  const [profiles, setProfiles] = useState();
  let [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleClick = (e, id) => {
    e.preventDefault();
    // debugger;
    // console.log(id);
    // props.setNavbar(false);
    navigate("/profile", { state: { id: id } });
  };

  const handleChange = ({ currentTarget: input }) => {
    setSearch(input.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get("https://tutorial4-api.herokuapp.com/api/users/")
      .then((res) => {
        setProfiles(
          res.data.data.filter((user) => {
            if (search.length === 0) return user;
            if (
              user.firstName.toLowerCase().includes(search.toLowerCase()) ||
              user.lastName.toLowerCase().includes(search.toLowerCase())
            ) {
              return user;
            }
            return null;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (profiles === null || profiles === undefined) {
    axios
      .get("https://tutorial4-api.herokuapp.com/api/users/")
      .then((res) => {
        setProfiles(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    profiles !== null &&
    profiles !== undefined && (
      <div
        className="main-page"
        style={{
          //   padding: "0% 5% 3% 5%",
          background: "#eee",
        }}
      >
        <h2 className="fw-normal text-center p-1">All Users Information</h2>
        <div className="pb-3" style={{ margin: "auto", width: "35%" }}>
          <form onSubmit={handleSubmit}>
            <div className="d-flex">
              <input
                value={search}
                onChange={handleChange}
                className="form-control me-2"
                type="search"
                placeholder="First Name or Last Name"
                aria-label="Search"
                style={{ padding: "0 5% 0 5%" }}
              />
              <button className="btn btn-light" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
        <div
          className="container bg-white"
          style={{
            height: "calc(100% - 17.5%)",
            // padding: "10% 20%",
            border: "2px solid rgba(0,0,0,0.2",
            overflow: "auto",
          }}
        >
          <div

          //   style={{ padding: "5% 15% 0 15%" }}
          >
            <div className="row" style={{ padding: "4.4%" }}>
              {profiles.map((user) => {
                return (
                  <UserCard
                    key={user.id}
                    data={user}
                    handleClick={handleClick}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Users;
