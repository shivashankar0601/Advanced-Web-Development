/*
    Author: Sahil Prafulkumar Parekh
    Banner: B00900956
    Feature: Chat
    Task: model for chat history
*/
const mongoose = require("mongoose");

const usersHistoryModel = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  history: [{
    id: { type: String, required: true },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
  }],
});

const usersHisotry = mongoose.model("userHistory", usersHistoryModel);

module.exports = usersHisotry;
