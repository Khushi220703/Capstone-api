const dotenv = require("dotenv");
dotenv.config();

const Ecommerce = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//  Function to generate JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );
};

//  Signup User Controller
const registerUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const userExists = await Ecommerce.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const saltRounds = parseInt(process.env.SALT, 10) || 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await Ecommerce.create({
            name,
            email,
            password: hashedPassword,
        });

        // 🔐 Generate token
        const token = generateToken(user);

        return res.status(201).json({
            message: "User created successfully",
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.error("Error registering user:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};


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

        // 🔐 Generate token
        const token = generateToken(user);

        return res.status(201).json({
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.error("Error logging in user:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { registerUser, loginUser };
