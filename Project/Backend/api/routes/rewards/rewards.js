//Author: Fenil Milankumar Parmar || BannerId: B00895684

const express = require("express");
const router = express.Router();

const rewardsModel = require("../../models/rewards");

router.get('/personal/:user_id', async (req, res) => {    
    user_id = req.params.user_id;
    var rewards = await rewardsModel.find({userId:user_id});

    var sumPoints = 0;
    for(let i = 0; i < rewards.length; i++) {
        sumPoints = parseInt(rewards[i]["points"]) + sumPoints;        
    }
    console.log(sumPoints);
    return res.status(200).json({
        totalPoints: sumPoints
    });
})

router.get('/all/:user_id', async (req, res) => {    
    user_id = req.params.user_id;
    var rewards = await rewardsModel.find({userId:user_id});
    

    return res.status(200).json({
        rewards: rewards
    });
})

router.post('/add/', async (req, res) => {    
    const reward = new rewardsModel({
        userId : req.body.userId,
        points : req.body.points,
        itemId : req.body.itemId,
        postedTime:  Date.now()
    })    
        
    reward.save(function (err) {
        if (err) {
            throw err;
        } else {
            return res.status(200).json({
                message: "Reward added successfully",
                success: true,
                body: reward
            });
        }
    });    
})


module.exports = router;
