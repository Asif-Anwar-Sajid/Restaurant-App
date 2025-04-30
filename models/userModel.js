const mongoose = require('mongoose');

// schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'User name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    },
    address: {
        type: Array
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    userType:{
        type: String,
        required: [true, 'User type is required'],
        default: 'client',
        enum: ['client', 'admin', 'vendor', 'driver']
    },
    profile: {
        type: String,
        defualt: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
    }
}, {timestamps:true})

module.exports = mongoose.model('User', userSchema);