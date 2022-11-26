/* 
author: Chirag Pancholi 
*/

const express = require("express");
const router = express.Router();



const usersModel = require("../../models/user");


router.get('/profile/:id', async (req, res) => {
    var id = req.params.id;

    var user = await usersModel.findOne({email: id});

    return res.status(200).json({
        user: user

    });
})


router.put('/profile/', async (req, res) => {
    var updateProfileData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        buildingNo : req.body.buildingNo
    } 
    var user = await usersModel.findOneAndUpdate({email: req.body.email}, {"$set": updateProfileData});
    
    return res.status(200).json({
        user: user

    });
})



module.exports = router;