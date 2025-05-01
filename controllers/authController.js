const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register controller
const registerController = async (req, res) => {
    try {
        const {userName, email, password, phone, address} = req.body;
        // validation
        if(!userName || !email || !password || !phone || !address) {
            return res.status(500).send({
                success: false,
                message: "All fields are required",
            });
        }
        //check if user already exists
        const existingUser = await userModel.findOne({email});
        if(existingUser) {
            return res.status(500).send({
                success: false,
                message: "Email is already registered. Please login",
            });
        }
        // hashing password
        var salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = await userModel.create({userName, email, password: hashedPassword, phone, address});
        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user: newUser,
        });
    } catch(error) {
        console.log("Error in Register API", error);
        return res.status(500).send({
            success: false,
            message: "Error in Register API",
        })
    }
};

// login controller
const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        // validation
        if(!email || !password) {
            return res.status(500).send({
                success: false,
                message: "All fields are required",
            });
        }
        // check if user exists
        const user = await userModel.findOne({email: email}).select("+password");
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered. Please register",
            });
        }
        console.log(password, user.password);
        // check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid password",
            });
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        user.password = undefined;

        res.status(200).send({
            success: true,
            message: "User logged in successfully",
            token,
            user
        })
    } catch(error) {
        console.log("Error in Login API", error);
        res.status(500).send({
            succcess: false,
            message: "Error in Login API",
            error
        })
    }
};

module.exports = { registerController, loginController };