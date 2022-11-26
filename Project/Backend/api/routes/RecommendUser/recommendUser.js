/* 
author: Dhruvkumar Patel
*/
const { Console } = require("console");
const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "dhruvpatel7910@gmail.com",
    pass: "hrhkscatmgytljek",
  },
  secure: true,
});


function sendRecommendEmail(senderEmail, postUrl, userEmail) {
  const mailData = {
    from: "dhruvpatel7910@gmail.com", // sender address
    to: senderEmail, // list of receivers
    subject: "Recommendation from SHARE IT",
    text: "You have a recommendation!",
    html: `<b>Hey there! </b> \
                 <br>User ${userEmail} has recommend you a product.<br/>\
                 <br> VISIT : http://shareit-csci5709.herokuapp.com/posts/view/${postUrl}`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}
router.post("/recommend", async (req, res) => {
  try {
    var postUrl = req.body.postId;
    var senderEmail = req.body.senderEmail;
    var userEmail = req.body.userEmail;
    sendRecommendEmail(senderEmail, postUrl, userEmail);
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("ADMIN Pending Application ERR -> get/application", err);
    return res.status(400).json({
      success: false,
    });
  }
});

module.exports = router;
