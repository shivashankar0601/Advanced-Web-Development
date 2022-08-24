//Author: Fenil Milankumar Parmar || BannerId: B00895684

const express = require("express");
const router = express.Router();

const rewardsModel = require("../../models/leaderBoard");

router.get('/', async (req, res) => {    
    var leaderBoard = await rewardsModel.find().sort({points:-1});

    return res.status(200).json({
        leaderBoard: leaderBoard
    });
})

router.post('/update/', async (req, res) => {    
    console.log(req.body.userId);
    var leaderBoard = await rewardsModel.findOne({userId:req.body.userId.toString()});
    console.log(leaderBoard);
    if(leaderBoard === null)
    {
     
        leaderboard = new rewardsModel({
            userId: req.body.userId,
            points: req.body.points
        });
        leaderboard.save(function (err) {
            if (err) {
                throw err;
            } else {
                return res.status(200).json({
                    message: "Leaderboard data added successfully",
                    success: true,
                    body: leaderboard
                });
            }
        });   
    }else
    {        
        var pointsUpdate = parseInt(leaderBoard['points']) + parseInt(req.body.points);     
        var updatedValue = await rewardsModel.updateOne(
            {"userId" : req.body.userId},
            {$set : {"points" : pointsUpdate}}
            );    
                
        return res.status(200).json({
            success: true,
            message: "Points Updated Successfully",
            body: updatedValue,
            leaderBoard: leaderBoard
        });   
    }
    
})

module.exports = router;
