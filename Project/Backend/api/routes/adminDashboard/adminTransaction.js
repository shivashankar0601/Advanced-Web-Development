/* 
author: Dhruvkumar Patel
*/
const express = require("express");
const router = express.Router();


const transactionModel = require("../../models/transactions");

router.get('/transactions', async (req, res) => {
    // var email = req.params.id
    try{
        var transactions = await transactionModel.find({});
        return res.status(200).json({
            success : true,
            transactions : transactions
        });
    }catch(err){
        console.log("ADMIN MODULE TRANSACTIONS ERR -> get/transactions", err);
        return res.status(200).json({
            success : false,
        });
    }
})


router.post("/transactions", async(req, res) => {
    try{
        var transactionRecord = {
            transactionAmount: req.body.transactionAmount,
            receiverEmail: req.body.receiverEmail,
            senderEmail: req.body.senderEmail,
            SenderEmailBuildingNo: req.body.SenderEmailBuildingNo,
            transactionTimeStamp: req.body.transactionTimeStamp
        }

        newTransaction = new transactionModel(transactionRecord);
        newTransaction.save();
        return res.status(200).json({
            success : true,
        });

        
    }catch(err){
        console.log("ADMIN MODULE TRNASACTION ERR-> post/transactions", err);
        return res.status(400).json({
            success : false,
        });
    }
})



module.exports = router;