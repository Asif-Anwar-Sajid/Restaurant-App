const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const getUserController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById({_id: req.body.id}).select("-_id");
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            })
        }
        res.status(200).send({
            success: true,
            message: "User Found ",
            user
        })
    } catch(error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get User API",
        })
    }
    console.log(req.body.id);
    res.status(200).send("User Data");
}

const updateUserController = async (req, res) => {  
    try {
        // find user
        const user = await userModel.findById({_id: req.body.id});
        
        // validation
        if(!user) {
           res.status(404).send({
                success: false,
                message: "User Not Found"
            }) 
        }

        console.log(req.body);

        // update user
        const {userName, address, phone} = req.body;
        if(userName) {
            user.userName = userName;
        }
        if(address) {
            user.address = address;
        }
        if(phone) {
            user.phone = phone;
        }
        // save user
        await user.save();
        user._id = undefined;
        res.status(200).send({
            success: true,
            message: "User Updated Successfully",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Update User API",
        });
    }
};

const resetPasswordController = async (req, res) => {
    try {
        const {email, newPassword, answer} = req.body;
        if(!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            });
        }
        // find user
        const user = await userModel.findById({_id: req.body.id});
        
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            });
        }
        console.log(user, answer, user.password);
        
        // check if answer is correct
        if(user.answer !== answer) {
            return res.status(500).send({
                success: false,
                message: "Incorrect Answer"
            });
        } 
        // hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        // update password
        console.log(user.password, hashedPassword);
        
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
            user
        });
    } catch(error) {
        res.status(500).send({
            success: false,
            message: "Error in Reset Password API",
            error
        });
    }
};

const updatePasswordController = async (req, res) => {
    try {
        const {oldPassword, newPassword} = req.body;
        if(!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: "Please provide the old and new password"
            });
        }
        // find user
        const user = await userModel.findById({_id: req.body.id}).select("+password");
        console.log(user.password);
        
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            });
        }
        // check if old password is correct
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Incorrect Old Password"
            });
        }
        
        // hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // save the new password
        user.password = hashedPassword;
        
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password Updated Successfully"
        });
    } catch(error) {
        res.status(500).send({
            success: false,
            message: "Error in Update Password API",
            error
        });
    }
};

const deleteUserController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete({_id: req.params.id});
        res.status(200).send({
            success: true,
            message: "User Deleted Successfully"
        });
    } catch(error) {
        res.status(500).send({
            success: false,
            message: "Error in Delete User API",
            error
        });
    }
};

module.exports = {
    getUserController,
    updateUserController,
    resetPasswordController,
    updatePasswordController,
    deleteUserController
};