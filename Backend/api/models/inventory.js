const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    id: {type: String},
    email: {type: String },
    itmName: {type: String },
    itmDetails: {type: String},
    price: {type: String}
})

const inventory = mongoose.model("inventory", inventorySchema);

module.exports= inventory;