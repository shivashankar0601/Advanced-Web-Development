/* 
author: Dhruvkumar Patel 
*/
const mongoose = require("mongoose");

const newUsersApplicationModel = new mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String },
    phoneNumber: {type: String},
    password: {type: String},
    securityAns: {type: String},
    address: {type: String},
    buildingNo: {type: String}
})


const newUsersApplication = mongoose.model("NewUsersApplication", newUsersApplicationModel);

module.exports= newUsersApplication;