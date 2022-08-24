const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    email: {type: String },
    stars: {type: String },
    details: {type: String}
})

const feedback = mongoose.model("feedback", feedbackSchema);

module.exports= feedback;