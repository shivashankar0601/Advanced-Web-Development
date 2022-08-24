/*
    Author: Sahil Prafulkumar Parekh
    Banner: B00900956
    Feature: Chat
    Task: model for chat message
*/
const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chats", chatSchema);
