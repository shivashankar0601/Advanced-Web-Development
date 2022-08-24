/*
    Author: Sahil Prafulkumar Parekh
    Banner: B00900956
    Feature: Chat
    Task: controller for a chat message
*/
const Chats = require("../models/chatModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { sender, receiver } = req.body;

    const messages = await Chats.find({
      users: {
        $all: [sender, receiver],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === sender,
        message: msg.message.text,
        id: msg._id,
        image: msg.image
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    let { sender, receiver, message, image } = req.body;
    if(image){
      message = message;
    }
    const data = await Chats.create({
      message: {text: message},
      users: [sender, receiver],
      sender: sender,
      image: image
    });

    if (data) return res.json({ id: data._id , msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.deleteMessage = async (req, res, next) => {
  try {
    const response = await Chats.deleteOne({ _id: req.params.id })
    return res.json(response);
  } catch (ex) {
    next(ex);
  }
};

