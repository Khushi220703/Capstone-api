const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    rating:{
        type:Number,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    imageUrl:{
        type:Array,
        require:true,
    },
    availableColors:{
        type:Array,
        require:true,
    },
    availableSizes:{
        type:Array,
        require:true,
    },
    materials:{
        type:Array,
        require:true,
    },
    features:{
        type:Array,
        require:true,
    },
    reviews:{
        type:Array,
        require:true,
    },
    brandName:{
        type:String,
        require:true,
    },
    maxStock:{
        type:Number,
        require:true,
    },
});

const Product = new mongoose.model("Product", ProductSchema);

module.exports = Product;