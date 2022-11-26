/* 
author: Dhruvkumar Patel 
*/

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    transactionAmount: {type: String },
    receiverEmail: {type: String},
    senderEmail: {type: String},
    SenderEmailBuildingNo: {type: String},
    transactionTimeStamp : {type: String}
})


const AdminProfile = mongoose.model("Transactions", transactionSchema);

module.exports= AdminProfile;