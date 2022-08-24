/* 
author: Dhruvkumar Patel
*/
const express = require("express");
const router = express.Router();


const adminProfileModel = require("../../models/adminProfile");


router.post('/signin', async (req, res) => {
    var userRecord = {
        email: req.body.email,
        password: req.body.password
    };
    console.log(userRecord.email);
    var userCreds = await adminProfileModel.findOne({'email' : userRecord.email});
    console.log(userCreds);
    if(!userCreds){
        return res.status(404).json({
            "valid": false
        });
    }
    if(userCreds.password == userRecord.password){
        return res.status(200).json({
            "valid": true,
            "buildingNo": userCreds.buildingAdminNo
        });
    }

    return res.status(404).json({
        "valid": false,
        "issuse": true
    }); 
})





module.exports = router;