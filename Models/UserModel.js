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

EcommerceSchema.pre('save', async function(next){
     
    if(!this.isModified('password')) return next(); 

    const saltRounds = parseInt(process.env.SALT,10) || 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
});

EcommerceSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});


const Ecommerce = mongoose.model("Ecommerce",EcommerceSchema);

module.exports = Ecommerce;