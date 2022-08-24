/* 
author: Dhruvkumar Patel
*/
const { Console } = require("console");
const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const newUsersApplicationModel = require("../../models/adminPendingApplication");
const newUsersModel = require("../../models/user");
const adminDetailsModel = require("../../models/adminProfile");


router.get('/details/:id', async (req, res)=> {
    var email = req.params.id;
    try{
        console.log("email", email);
        var adminDetails = await adminDetailsModel.findOne({email: email});
        var buildingNo = adminDetails.buildingAdminNo;
        var newUsers = await (await newUsersApplicationModel.find({buildingNo: buildingNo})).length;
        var activeUsers = await (await newUsersModel.find({buildingNo:buildingNo})).length;
        return res.status(200).json({
            newUsers: newUsers,
            activeUsers:activeUsers,
            success: true
        });
    }catch(err){
        console.log("ADMIN Pending Application ERR -> get/application", err);
        return res.status(400).json({
            success: false
        });
    }
})


module.exports = router;