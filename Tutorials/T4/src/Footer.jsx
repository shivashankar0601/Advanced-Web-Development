import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer className="bg-dark text-center text-md-start">
        <div
          className="text-center p-3 text-light"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 Copyright: Tutorial 4
        </div>
      </footer>
    );
  }
}

export default Footer;
