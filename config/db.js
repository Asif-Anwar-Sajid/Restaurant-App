const mongoose = require('mongoose');
const colors = require('colors');

// function: mongodb connection method
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${mongoose.connection.host}`.bgCyan.white);
        
    } catch(error) {
        console.log("Database connection error", error.bgRed.white);
        
    }
}

module.exports = {
    connectDb
}