const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const EcommerceSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
        
    },

});

const Ecommerce = mongoose.model("Ecommerce",EcommerceSchema);

module.exports = Ecommerce;