const dotenv = require("dotenv");
dotenv.config();
const Ecommerce = require("../Models/UserModel");
const bcrypt = require("bcrypt");

// Signup User Controller
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

       
        const userExists = await Ecommerce.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: "Email already exists" });
        }

      
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const user = await Ecommerce.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "User created successfully",
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.error("Error registering user:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Login User Controller
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
       
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        
        const user = await Ecommerce.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }

      
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        return res.status(200).json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.error("Error logging in user:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { registerUser, loginUser };
