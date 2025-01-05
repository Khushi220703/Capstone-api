const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const CartSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        require:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Ecommerce",
        require:true,
    },
    quantity:{
        type:Number,
        require:true,
    },
});

const Cart = new mongoose.model("Cart", CartSchema);

module.exports = Cart;