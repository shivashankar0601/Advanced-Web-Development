const express = require("express");
const router = express.Router();



const inventorySchema = require("../../models/inventory");



router.post('/inv/add/:id', async (req, res) => {
    let newItem={
        id: Date.now(),
        email : req.params.id,
        itmName:  req.body.name,
        itmDetails : req.body.details,
        price: req.body.price
    }
    
    //const result = await usersModel.findOne({email:id});
    const result =  await inventorySchema.insertMany(newItem)
    if(!result){
        return res.status(404).json({ 
            "Inventory": false
        });
    }
    else{
        return res.status(200).json({
            "Inventory": result
        });
        
    }
});

router.get('/inv/get/:id', async (req, res) => {
    
    id = req.params.id;
       
    
    const result = await inventorySchema.find({email:id});
    if(!result){
        return res.status(404).json({ 
            "Inventory": "Not Found"
        });
    }
    else{
        return res.status(200).json({
            "Inventory": result
        });
        
    }
});

router.delete('/inv/del/:id', async (req, res) => {
    
    id = req.params.id;
       
    
    const result = await inventorySchema.deleteOne({id:id});
    if(!result){
        return res.status(404).json({ 
            "Inventory": "Not Found"
        });
    }
    else{
        return res.status(200).json({
            "Inventory": result
        });
        
    }
});



module.exports = router;