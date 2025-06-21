const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true

    },
    userName: {
        type: String,
        required: [true, 'field is required']
    },
    location: {
        type: String,
        required: [true, 'field is required']

    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },


}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)