import React from "react";
import "bootstrap/dist/css/bootstrap.css";
const Navbar = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // navigate("/users?dylan");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" style={{ cursor: "pointer" }}>
          Tutorial 4
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/createpost">
                  Create Post
                </Link>
              </li> */}
          </ul>
          <form
            className="d-flex"
            onSubmit={handleSubmit}
            style={{ paddingRight: "50px" }}
          >
            {/* <input
              className="form-control me-2"
              type="search"
              placeholder="First Name or Last Name"
              aria-label="Search"
            />
            <button className="btn btn-light" type="submit">
              Search
            </button> */}
          </form>
          <img
            src="https://bootdey.com/img/Content/avatar/avatar7.png"
            alt="Admin"
            className="rounded-circle p-1 bg-light"
            width="35"
            style={{ marginRight: "20px", cursor: "pointer" }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
