const express = require('express')
const mongoose = require('mongoose')
const User = require('../model/User.model')
const bcrypt = require('bcrypt')

const registerController = async (req, res) => {
    try {
        const { firstName, lastName, userName, location, role, email, password } = req.body

        const emailExist = await User.findOne({ email })
        const usernameExist = await User.findOne({ userName })
        if (usernameExist || emailExist) {
            console.log('user exists')
            throw new Error("user exists")
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const user = new User({
            firstName,
            lastName,
            userName,
            location,
            role,
            email,
            password:hashedPassword
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


const loginController= async(req,res)=>{
    try {
        const{email,password,userName}=req.body

        const user = await User.findOne({email})

        if(!user) {
            res.status(401)
            throw new Error('Invalid email , userName or password')
            console.log("User Does not exist")
        }
        const isMatch = await bcrypt.compare(passsword,user.password)
        if(isMatch){
            res.status(401)
            throw new Error('Invalid email , userName or password')
        }

        await user.save()
        res.status(200).json({
            success:true,
            message:'user logged in ',
             _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            location: user.location,
            role: user.role,
        })
    } catch (error) {
         console.error("Something Happened", error)
        res.status(500).json({
            success: false,
            message: "Something Went Wrong",
            error
        })
    }
    
}

module.exports={
    registerController,
    loginController
}