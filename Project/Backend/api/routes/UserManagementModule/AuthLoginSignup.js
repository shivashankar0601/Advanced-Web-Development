/* 
author: Chirag Pancholi 
*/
const express = require("express");
const router = express.Router();


const newUsersApplicationModel = require("../../models/adminPendingApplication");
const usersModel = require("../../models/user");


router.post('/signup', async (req, res) => {
    var newUserCheck =  await newUsersApplicationModel.findOne({email: req.body.email})
    var existsUserCheck =  await usersModel.findOne({email: req.body.email})
    if (!newUserCheck || !existsUserCheck ){

        let userRecord = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            securityAns: req.body.securityAns,
            address: req.body.address,
            buildingNo: req.body.buildingNumber
        };
        console.log(userRecord);
        
        newUser = new newUsersApplicationModel(userRecord);
        newUser.save();
    
        return res.status(200).json({
            application: "ACCEPTED",
            user: userRecord
    
        });
    }
    else{
        return res.status(400).json({
            application: "REJECTED",
            user: false
    
        });

    }
})


router.post('/signin', async (req, res) => {
    var userRecord = {
        email: req.body.email,
        password: req.body.password
    };
    console.log(userRecord.email);
    var userCreds = await usersModel.findOne({'email' : userRecord.email});
    console.log(userCreds);
    if(!userCreds){
        return res.status(404).json({
            "valid": false
        });
    }
    if(userCreds.password == userRecord.password){
        return res.status(200).json({
            "valid": true
        });
    }

    return res.status(404).json({
        "valid": false,
        "issuse": true
    }); 
})


router.post('/forget', async (req, res) => {
    var userRecord = {
        email: req.body.email,
        answer: req.body.answer
    };
    var userCreds = await usersModel.findOne({'email' : userRecord.email});
    var newPassword = (Math.random() + 1).toString(36).substring(5);
    console.log(userCreds);
    console.log(newPassword);
    console.log(userRecord);
    if(!userCreds){
        return res.status(404).json({
            "valid": false
        });
    }
    if(userCreds.securityAns == userRecord.answer){
        var newUserPass = await usersModel.findOneAndUpdate({'email': userRecord.email}, {'$set': {'password': newPassword}})
        newUserPass.save()
        return res.status(200).json({
            "valid": true,
            "newPassword": newPassword
        });
    }

    return res.status(404).json({
        "valid": false,
        "issuse": true
    }); 
})




module.exports = router;