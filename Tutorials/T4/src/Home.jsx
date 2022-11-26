import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user_email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const [errors, setErrors] = useState({ user_email: "", user_password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = validateFormFields({
      user_email: user_email,
      user_password: user_password,
      validForm: false,
    });
    setErrors(errors);
    if (errors.validForm) {
      axios
        .post("https://tutorial4-api.herokuapp.com/api/users/login", {
          email: user_email,
          password: user_password,
        })
        .then((res) => {
          alert(res.data.message);
          navigate("/users");
        })
        .catch((error) => {
          // console.log(error);
          alert(error.response.data.message);
        });
    }
  };

  const validateFormFields = (fields) => {
    let errors = { user_email: "", user_password: "", validForm: false };

    if (fields.user_email.length === 0) {
      errors.user_email = "email should not be empty";
      return errors;
    }

    if (!/[a-zA-Z0-9_]+@[a-zA-Z]+(.)[a-zA-Z]+$/.test(fields.user_email)) {
      errors.user_email = "please enter a valid email";
      return errors;
    }

    if (fields.user_password.length < 8) {
      errors.user_password =
        "password length should be minimum of 8 characters";
      return errors;
    }

    errors.validForm = true;
    return errors;
  };

  const handleChange = ({ currentTarget: input }) => {
    if (input.name === "email") setEmail(input.value);
    else setPassword(input.value);
  };

  return (
    <div
      className="main-page"
      style={{
        padding: "3% 15%",
        background: "#eee",
      }}
    >
      <div
        className="container bg-white"
        style={{
          height: "calc(100% - 3%)",
          padding: "10% 20%",
          border: "2px solid rgba(0,0,0,0.2",
        }}
      >
        <div className="row">
          <div className="col align-items-center">
            <form onSubmit={handleSubmit}>
              <div style={{ padding: "5% 15% 0 15%" }}>
                <h3 className="fw-normal mb-3 pb-5">Sign into your account</h3>
                <div className="form-outline mb-4">
                  <label htmlFor="email" className="form-label">
                    Username :
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-control form-control-lg"
                    onChange={handleChange}
                    value={user_email}
                    name="email"
                  />
                  {errors.user_email.length > 0 && (
                    <div
                      className="alert alert-danger"
                      style={{
                        //   marginLeft: "10px",
                        padding: "7px",
                        textAlign: "center",
                      }}
                    >
                      {errors.user_email}
                    </div>
                  )}
                </div>
                <div className="form-outline mb-4">
                  <label htmlFor="password" className="form-label">
                    Password :
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control form-control-lg"
                    onChange={handleChange}
                    value={user_password}
                    name="password"
                  />
                  {errors.user_password.length > 0 && (
                    <div
                      className="alert alert-danger"
                      style={{
                        //   marginLeft: "10px",
                        padding: "7px",
                        textAlign: "center",
                      }}
                    >
                      {errors.user_password}
                    </div>
                  )}
                </div>
                <div className="pt-1 mb-4">
                  <input
                    type="submit"
                    className="btn btn-dark btn-lg btn-block"
                    value="Login"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
