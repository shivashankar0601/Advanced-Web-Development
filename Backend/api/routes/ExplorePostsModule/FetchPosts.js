//Author: Fenil Milankumar Parmar || BannerId: B00895684

const express = require("express");
const router = express.Router();


const postModel = require("../../models/createPostModel");

router.get("/posts", async (req, res) => {
    var user = await postModel.find();

    return res.status(200).json({
        posts: user,
    });
});



router.get('/posts/:id', async (req, res) => {
    
    id = req.params.id;
    
    
    const result = await postModel.find({email:id});
    if(!result){
        return res.status(404).json({ 
            "feedbacks": "Not Found"
        });
    }
    else{
        return res.status(200).json({
            "posts": result
        });
        
    }
});


module.exports = router;
