import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Input from "./Input";
import Joi from "joi";
import background from "./image.jpg";

class Register extends Component {
  state = {
    fields: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      repeat_password: "",
    },
    errors: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      repeat_password: "",
      validForm: false,
    },
  };
  render() {
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
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={this.handleSubmit}
                      >
                        <Input
                          id="firstname"
                          text="First Name"
                          type="text"
                          value={this.state.fields.firstname}
                          onChangeEvent={this.onChangeHandler}
                          errorMessage={this.state.errors.firstname}
                          errorClass="alert alert-danger"
                        />
                        <Input
                          id="lastname"
                          text="Last Name"
                          type="text"
                          value={this.state.fields.lastname}
                          onChangeEvent={this.onChangeHandler}
                          errorMessage={this.state.errors.lastname}
                          errorClass="alert alert-danger"
                        />

                        <Input
                          id="email"
                          text="Your Email"
                          type="email"
                          value={this.state.fields.email}
                          onChangeEvent={this.onChangeHandler}
                          errorMessage={this.state.errors.email}
                          errorClass="alert alert-danger"
                        />

                        <Input
                          id="password"
                          text="Password"
                          type="password"
                          value={this.state.fields.password}
                          onChangeEvent={this.onChangeHandler}
                          errorMessage={this.state.errors.password}
                          errorClass="alert alert-danger"
                        />

                        <Input
                          id="repeat_password"
                          text="Repeat your password"
                          type="password"
                          value={this.state.fields.repeat_password}
                          onChangeEvent={this.onChangeHandler}
                          errorMessage={this.state.errors.repeat_password}
                          errorClass="alert alert-danger"
                        />

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        src={background}
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  validationRules = Joi.object({
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(8).max(30).required(),
    repeat_password: Joi.ref("password"),
  }).with("password", "repeat_password");

  onChangeHandler = ({ currentTarget: input }) => {
    // console.log(input);
    const fields = { ...this.state.fields };
    fields[input.name] = input.value;
    this.setState({ fields });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const fields = { ...this.state.fields };
    let errors = { ...this.state.errors };

    errors.firstname = "";
    errors.lastname = "";
    errors.email = "";
    errors.password = "";
    errors.repeat_password = "";
    errors.validForm = true;

    // const result = this.validationRules.validate(fields, { abortEarly: false });

    // if (result.error && result.error.details.length > 0) {
    //   result.error.details.map(
    //     (field) => (errors[field.path[0]] = field.message)
    //   );
    //   errors.validForm = false;
    // }

    errors = this.validation(fields);
    this.setState({ fields, errors });
    // console.log(result);
    if (errors.validForm)
      document.location.replace(
        "/profile?name=" +
          fields.firstname +
          "%20" +
          fields.lastname +
          "&email=" +
          fields.email
      );
  };

  validation = (fields) => {
    let errors = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      repeat_password: "",
      validForm: false,
    };

    if (fields.firstname.length === 0) {
      errors.firstname = "first name field should not be empty";
      return errors;
    }
    if (!/^[a-zA-Z]+$/.test(fields.firstname)) {
      errors.firstname = "first name should contain only alphabets";
      return errors;
    }

    if (fields.lastname.length === 0) {
      errors.lastname = "last name field should not be empty";
      return errors;
    }
    if (!/^[a-zA-Z]+$/.test(fields.lastname)) {
      errors.lastname = "last name should contain only alphabets";
      return errors;
    }

    if (fields.password !== fields.repeat_password) {
      errors.repeat_password = "password and repeat password should match";
      errors.password = "password and repeat password should match";
      return errors;
    }

    if (fields.password.length < 8) {
      errors.password = "password length should be minimum of 8 characters";
      return errors;
    }

    if (fields.repeat_password.length < 8) {
      errors.repeat_password =
        "repeat password length should be minimum of 8 characters";
      return errors;
    }

    return errors;
  };
}

export default Register;
