const userModel = require("../models/userModel");

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
        // create new user
        const newUser = await userModel.create({userName, email, password, phone, address});
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

module.exports = { registerController };