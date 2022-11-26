//Author: Fenil Milankumar Parmar || BannerId: B00895684

const mongoose = require("mongoose");

module.exports = leaderBoardModel = mongoose.model(
    "leaderBoard",
    new mongoose.Schema({        
        userId: { type: String },
        points: { type: String }        
    })
);
