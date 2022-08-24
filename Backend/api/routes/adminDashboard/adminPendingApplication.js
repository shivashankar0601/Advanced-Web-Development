/* 
author: Dhruvkumar Patel
*/
const { Console } = require("console");
const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const newUsersApplicationModel = require("../../models/adminPendingApplication");
const newUsersModel = require("../../models/user");
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

function sendWelcomeEmail(userEmail, name) {
    const mailData = {
        from: "dhruvpatel7910@gmail.com", // sender address
        to: userEmail, // list of receivers
        subject: "Welcome to SHARE IT",
        //   text: "You have a recommendation!",
        html: `<head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>New Account Email Template</title>
      <meta name="description" content="Welcome Email Template.">
      <style type="text/css">
          a:hover {text-decoration: underline !important;}
      </style>
  </head>
  
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
      <!-- 100% body table -->
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
          style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
          <tr>
              <td>
                  <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0"
                      align="center" cellpadding="0" cellspacing="0">
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                     <tr>
                          <td style="text-align:center;">
                              <a href="https://shareit-csci5709.herokuapp.com/" title="logo" target="_blank">
                              <img height="130" width="170" src="https://iili.io/wUV5ga.jpg" title="logo" alt="logo">
                            </a>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
  
  
                      <tr>
                          <td>
                              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                  style="max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                                  <tr>
                                      <td style="padding:0 35px;">
                                          <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Get started
                                          </h1>
                                          <p style="font-size:15px; color:#455056; margin:8px 0 0; line-height:24px;">
                                              <strong>Welcome ${name}</strong> to Share-it, We are pleased to have you on board with us. Let's join hands and help the community.</p>
                                              <p>You can login into your account using the email and password you provided in the Sign-Up form</p>
                                          <!-- <span
                                              style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span> -->
                                   
                                          <a href="https://shareit-csci5709.herokuapp.com/"
                                              style="background:#20e277;text-decoration:none !important; display:inline-block; font-weight:500; margin-top:24px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Login
                                              to your Account</a>
  
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                              <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>Share-It</strong> </p>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
      <!--/100% body table-->
  </body>`,
    };

    transporter.sendMail(mailData, function (err, info) {
        if (err) console.log(err);
        else console.log(info);
    });
}

router.get('/applications/:id', async (req, res)=> {
    let id = req.params.id;
    try{
        var newUsers = await newUsersApplicationModel.find({buildingNo: id});
        return res.status(200).json({
            applications: newUsers,
            success: true
    
        });
    }catch(err){
        console.log("ADMIN Pending Application ERR -> get/application", err);
        return res.status(400).json({
            success: false
        });
    }
})


router.post('/application/accept', async (req, res) => {
    var email = req.body.email;
    var userRecord = await newUsersApplicationModel.findOne({email: email}).select("-_id");
    console.log(userRecord);
    if(userRecord){
        var newUser = new newUsersModel(userRecord);
        newUser._id = mongoose.Types.ObjectId();
        newUser.isNew = true;
        newUser.save();
        await sendWelcomeEmail(email, userRecord.firstname)
        await newUsersApplicationModel.findOneAndRemove({email: email});
        

    }
    return res.status(200).json({
        application: "ACCEPTED",
        success: true
    });

})


router.post('/application/reject', async (req, res) => {
    var email = req.body.email;
    try{

        var userRecord = await newUsersApplicationModel.findOneAndRemove({email: email});
        return res.status(200).json({
            application: "REJECTED",
            success: true
    
        });
    }catch(err){
        return res.status(400).json({
            application: "Error",
            success: false
    
        }); 
    }
});


module.exports = router;