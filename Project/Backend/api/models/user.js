/* 
author: Chirag Pancholi 
*/
const mongoose = require("mongoose");

const usersModel = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    password: { type: String },
    securityAns: { type: String },
    address: { type: String },
    buildingNo: { type: String },
    likedPosts: { type: Array },
});

const users = mongoose.model("users", usersModel);

module.exports = users;
