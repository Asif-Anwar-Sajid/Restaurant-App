const userModel = require("../models/userModel");

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

module.exports = {
    getUserController,
    updateUserController
};