//Author: Fenil Milankumar Parmar || BannerId: B00895684

const express = require("express");
const router = express.Router();

const usersModel = require("../../models/user");

router.get('/profiles', async (req, res) => {    
    var user = await usersModel.find();

    return res.status(200).json({
        user: user
    });
})



module.exports = router;
