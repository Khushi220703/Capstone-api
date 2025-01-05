const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = async (req,res,next) =>{
    const {email} = req.body;
   
    
    if (typeof email !== "string") {
        console.log(typeof email);
        
        throw new Error("Email must be a string");
    }
    const token = jwt.sign({email},process.env.SECRET_KEY,{expiresIn:"30d"});
    req.token = token;
    next();
    
};

const userAuthentication = async (req, res, next) => {

    try {
        const token = req.header("Authorization").replace("Bearer", "");
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Please authenticate" });
    }
};

module.exports = {generateToken,userAuthentication};