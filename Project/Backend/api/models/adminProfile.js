/* 
author: Dhruvkumar Patel 
*/

const mongoose = require("mongoose");

const adminProfileSchema = new mongoose.Schema({
    email: {type: String },
    name: {type: String},
    address: {type: String},
    contactNo: {type: String},
    buildingAdminNo : {type: String},
    password: {type: String}
})

const AdminProfile = mongoose.model("AdminProfile", adminProfileSchema);

module.exports= AdminProfile;