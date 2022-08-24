/*
    Author: Sahil Prafulkumar Parekh
    Banner: B00900956
    Feature: Payment
    Task: model for payment status
*/
const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    amount: {type: String },
    userid : {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    postid : {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    senderEmail: { type: String },
    paymentStatus: { type: Boolean, required: true }
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
