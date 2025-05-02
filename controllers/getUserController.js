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
            message: "Error in getUserController",
        })
    }
    console.log(req.body.id);
    res.status(200).send("User Data");
}

module.exports = {
    getUserController
};