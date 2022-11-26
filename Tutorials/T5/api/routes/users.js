const express = require("express");
const router = express.Router();

/* Writing the json content to the file, however we make the json in this function with the given informatin */
const writeToJson = (firstName, email, id) => {
  const users = require("../data/users.json");
  users.push({ email: email, firstName: firstName, id: id });
  saveFile(users);
};

/* Method to save the content/json data to the users.json file*/
const saveFile = (data) => {
  const fs = require("fs");
  fs.writeFile(
    "./api/data/users.json",
    JSON.stringify(data),
    function writeJSON(err) {
      if (err) return console.log(err);
    }
  );
};

const generateRandomId = () => {
  let chars = 10;
  let res = "";
  const box = "abc0de1fgh2ijk3lm9n4opq5rst6uvw7xyz8";
  const boxLen = box.length;
  for (let i = 0; i < chars; i++)
    res += box.charAt(Math.floor(Math.random() * boxLen));
  return res;
};

/*  Request methods are written here */

// GET : <your_application_link>/users

router.get("/users", (req, res) => {
  try {
    const users = require("../data/users.json");
    return res.status(200).json({
      message: "Users retrieved",
      success: true,
      users: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

/************************************************************/

// PUT - <your_application_link>/update/:id
router.put("/update/:id?", (req, res) => {
  try {
    id = req.params.id;
    if (id === undefined) id = req.query.id;

    email = req.body.email;
    firstName = req.body.firstName;

    if (id === undefined) throw "Missing required information";

    if (email === undefined && firstName === undefined) {
      throw "Missing required information";
    }
    const users = require("../data/users.json");
    let user = users.filter((data) => data.id === id);

    if (user && user.length === 1 && user[0] !== undefined) {
      user = user[0];

      if (firstName !== undefined) user.firstName = firstName;
      if (email !== undefined) user.email = email;

      // taking out the existing user object from the json file
      tempUsers = users.filter((data) => data.id != id);
      tempUsers.push(user);
      saveFile(tempUsers);
      return res.status(200).json({
        message: "User updated",
        success: true,
      });
    } else {
      throw "User not found";
    }
  } catch (error) {
    if (error === "Missing required information") {
      return res.status(400).json({
        message: error,
        success: false,
      });
    } else if (error === "User not found") {
      return res.status(404).json({
        message: error,
        success: false,
      });
    } else {
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  }
});

/************************************************************/

// POST - <your_application_link>/add

router.post("/add", (req, res) => {
  try {
    const email = req.body.email;
    const firstName = req.body.firstName;

    responseObj = {};
    if (email !== undefined && firstName !== undefined) {
      const users = require("../data/users.json");
      let index = users.findIndex((data) => data.email === email);
      if (index > -1) throw "User already exists";

      id = generateRandomId();
      writeToJson(firstName, email, id);
      return res.status(201).json({
        message: "User added",
        success: true,
      });
    } else {
      throw "Incomplete information, firstName and email are required.";
    }
  } catch (error) {
    if (error === "Incomplete information, firstName and email are required.")
      return res.status(400).json({
        message: error,
        success: false,
      });
    else if (error === "User already exists")
      return res.status(400).json({
        message: error,
        success: false,
      });
    else
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
  }
});

/************************************************************/

// GET- <your_application_link>/user/:id

router.get("/user/:id?", (req, res) => {
  try {
    id = req.params.id;
    if (id === undefined) id = req.query.id;

    if (id === undefined) throw "Missing required information";

    const users = require("../data/users.json");
    let user = users.filter((data) => data.id === id);

    if (user.length == 1) {
      return res.status(200).json({
        success: true,
        user: user[0],
      });
    } else {
      throw "user not found";
    }
  } catch (error) {
    if (error === "Missing required information") {
      return res.status(400).json({
        message: error,
        success: false,
      });
    } else if (error === "user not found") {
      return res.status(404).json({
        message: error,
        success: false,
      });
    } else {
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  }
});

module.exports = router;
