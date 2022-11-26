/* 
author: Dhruvkumar Patel
*/
const express = require("express");
const router = express.Router();


const AdminProfileModel = require("../../models/adminProfile");

router.get('/profile/:id', async (req, res)=> {
    var id = req.params.id;
    try{

        var adminProfileDeatils = await AdminProfileModel.findOne({email: id });
        if(adminProfileDeatils){

            return res.status(200).json({
                success : true,
                profile : adminProfileDeatils
            });
        }

        return res.status(200).json({
            success : false,
            profile : adminProfileDeatils
        });

    }catch(err){
        console.log("ADMIN MODULE ERR -> get/profile/id", err);
        return res.status(400).json({
            success : false,
        });
    }
})


router.put("/profile/:id", async (req, res)=> {
    var id= req.params.id;
    var updateProfileData = {
        name: req.body.name,
        address: req.body.address,
        contactNo: req.body.contactNo
    }
    try{

        await AdminProfileModel.findOneAndUpdate({email: id}, updateProfileData);
        return res.status(200).json({
            success : true,
        });

    }catch(err){
        console.log("ADMIN MODULE ERR -> put/profile/id", err);
        return res.status(400).json({
            success : false,
        });

    }
})


module.exports = router;