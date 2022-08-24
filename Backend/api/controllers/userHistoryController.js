/*
    Author: Sahil Prafulkumar Parekh
    Banner: B00900956
    Feature: Chat
    Task: controller for a chat message history
*/
const User = require("../models/usersHistoryModel");

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ user_id: req.params.id },{history:1,_id:0});
    
    return res.json(users.map((x)=> x.history));
  } catch (ex) {
    next(ex);
  }
};

module.exports.addChatUser = async (req, res, next) => {
  try {
    const { sender, receiver, email, firstname, lastname } = req.body;
    const senderCheck = await User.findOne({ user_id: sender });
    if (senderCheck) {
        const receiverStatus = await User.findOne({ user_id: sender, history: {$elemMatch:{id: receiver} } })
        if(receiverStatus){
            return res.json({ msg: "User is already in history", status: false });
        }else{
            const response = await User.updateOne({user_id: sender},{$push:{history:{ id: receiver, firstname, lastname, email }}});
            return res.json({ status: true, msg: "User added in history", });
        }
    } else {
        const user = {
            user_id: sender,
            history: [{ id: receiver, firstname, lastname, email }],
          };
          const response = await User.create(user);
          return res.json({ status: true, msg: "User added in history", });
    }
  } catch (ex) {
    next(ex);
  }
};
