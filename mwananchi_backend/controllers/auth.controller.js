const express = require('express')
const mongoose = require('mongoose')
const User = require('../model/User.model')

const registerController = async (req, res) => {
    try {
        const { firstName, lastName, userName, location, role, email, password } = req.body

        const emailExist = await User.findOne({ email })
        const usernameExist = await User.findOne({ userName })
        if (usernameExist || emailExist) {
            console.log('user exists')
            throw new Error("user exists")
        }

        const user = new User({
            firstName,
            lastName,
            userName,
            location,
            role,
            email,
            password
        })



        await user.save()
        res.status(201).json({
            success:false,
            message: "User register successfullyy",
            user
        })

    } catch (error) {
res.status(500).json({
    success:false,
    message:"something happened",
    error
})
    }
}


module.exports={
    registerController
}