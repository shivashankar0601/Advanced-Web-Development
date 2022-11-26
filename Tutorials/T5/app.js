const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const userRoute = require("./api/routes/users");

const rootRoute = "/api";

app.use(rootRoute, userRoute);

app.use("/", (req, res) => {
  res.send(
    "Welcome To CSCI 5709 Tutorial 5<br /><br />The following are the supported API's at the moment<br />GET : https://ssp-t5.herokuapp.com/api/users<br />GET : https://ssp-t5.herokuapp.com/api/user/:id<br />PUT : https://ssp-t5.herokuapp.com/api/update/:id<br />POST : https://ssp-t5.herokuapp.com/api/add<br />"
  );
});

module.exports = app;
