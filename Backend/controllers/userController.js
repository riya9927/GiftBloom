import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken";

const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
};

// Route for user login
const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(400).json({ success: false, message: "User doesn't exists." });
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(isMatch){
            const token=createToken(user._id);
            res.json({success:true,token})
        }
    } catch (error) {
        console.error("Error in registerUser:", error.message);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};

// Route for register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Checking if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Checking if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Validating password strength
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Hashing the user's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating a new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        // Generating a token
        const token = createToken(user._id);
        res.status(201).json({ success: true, token });

    } catch (error) {
        console.error("Error in registerUser:", error.message);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};

// Route for user admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for admin credentials
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Add expiry for security
            res.status(200).json({ success: true, token });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Error in adminLogin:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



export {loginUser,registerUser,adminLogin};