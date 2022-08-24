//Author: Fenil Milankumar Parmar || BannerId: B00895684
//Author: Shiva Shankar Pandillapalli  || BannerId: B00880049

/*
    Author: Shiva Shankar Pandillapalli
    Banner: B00880049
    Feature: Posts
    Task: model for posts as this is the base for entire information structure
*/

const mongoose = require("mongoose");

module.exports = createPostModel = mongoose.model(
    "posts",
    new mongoose.Schema({
        email: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        postedTime: { type: String },
        address: { type: String },
        name: { type: String },
        description: { type: String },
        unitType: { type: String },
        quantity: { type: String },
        availability: { type: String },
        condition: { type: String },
        images: { type: Array },
    })
);
