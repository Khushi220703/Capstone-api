const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connection = async () =>{
    try {
        
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Successfully connected to mongoDb.....");
        return "Successfully connected to mongoDb.....";

    } catch (error) {
        console.log(error);
        return "There is an error while connecting to mongoDb.....";
    }
};

module.exports = connection;