const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        // get the JWT token
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Invalid token",
                });
            } else {
                req.body = { ...req.body, id: decoded.id };
                next();
            }
        });
    } catch (error) {
        console.log("Auth middleware error", error);
        res.status(500).send({
            success: false,
            message: "Auth middleware error",
        })
        
    }
}