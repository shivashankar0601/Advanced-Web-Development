const express = require("express");
const router = express.Router();



const feedbackSchema = require("../../models/feedback");



router.post('/add/:id', async (req, res) => {
    let newFeedback={
        email : req.params.id,
        stars : req.body.stars,
        details : req.body.details
    }
    
    //const result = await usersModel.findOne({email:id});
    const result =  await feedbackSchema.insertMany(newFeedback)
    if(!result){
        return res.status(404).json({ 
            "success": false
        });
    }
    else{
        return res.status(200).json({
            "feedback": result
        });
        
    }
});

router.get('/get/:id', async (req, res) => {
    
    id = req.params.id;
       
    
    const result = await feedbackSchema.find({email:id});
    if(!result){
        return res.status(404).json({ 
            "feedbacks": "Not Found"
        });
    }
    else{
        return res.status(200).json({
            "feedbacks": result
        });
        
    }
});


module.exports = router;
