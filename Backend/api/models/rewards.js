//Author: Fenil Milankumar Parmar || BannerId: B00895684

const mongoose = require("mongoose");

module.exports = rewardsModel = mongoose.model(
    "rewards",
    new mongoose.Schema({
        rewardsId: { type: String },
        userId: { type: String },
        points: { type: String },
        itemId: { type: String },
        postedTime: { type: String }        
    })
);
