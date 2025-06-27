const express = require('express')
const mongoose = require('mongoose')
const User = require('../model/User.model')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')

const registerController = async (req, res) => {
    try {
        const { firstName, lastName, userName, location, role, email, password } = req.body

        const emailExist = await User.findOne({ email })
        const usernameExist = await User.findOne({ userName })
        if (usernameExist || emailExist) {
            console.log('user exists')
            return res.status(400).json({
                success: false,
                message: 'user exists',
            });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({
            firstName,
            lastName,
            userName,
            location,
            role,
            email,
            password: hashedPassword
        })



        await user.save()
        res.status(201).json({
            success: true,
            message: "User register successfullyy",
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            role: user.role,
            location: user.location,
            token: generateToken(user._id, user.role),
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something happened",
            error
        })
    }
}


const loginController = async (req, res) => {
    try {
        const { identifier, password } = req.body
        console.log('Identifier received:', identifier);

        const user = await User.findOne({
            $or: [{ email: identifier }, { userName: identifier }]
        })

        // console.log('User found:', user);
        if (!user) {
            // res.status(401)
            // throw new Error('Invalid email , userName or password')
            console.log("User Does not exist")
            return res.status(401).json({
                success: false,
                message: 'Invalid email, userName or password',
            });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email, userName or password',
            });
        }


        res.status(200).json({
            success: true,
            message: 'user logged in ',
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            location: user.location,
            role: user.role,
            token: generateToken(user._id, user.role)
        })
    } catch (error) {
        console.error("Something Happened", error)
        res.status(500).json({
            success: false,
            message: "Something Went Wrong",
            error: error.message
        })
    }

}

const getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        if (!user) {
            console.log('User not found!!')
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })

        }
        res.status(200).json({
            success: true,
            user
        })


    } catch (error) {
        console.error("Something Happened", error)
        res.status(500).json({
            success: false,
            message: "error in fetching users",
            error: error.message
        })
    }
}

const allUserController = async (req, res) => {
    try {
        const user = await User.find().select('-password')
        // console.log(user);


        if (!user) {
            console.log('No User Found')
            res.status(404).json({
                success: false,
                message: "error in feftching all users",
                error: error.message
            })
        }

        res.status(200).json({
            success: true,
            user,

        })
    }
    catch (error) {
        console.error("Something Happened", error)
        res.status(500).json({
            success: false,
            message: "error in fetching users",
            error: error.message
        })
    }
}





module.exports = {
    registerController,
    loginController,
    allUserController,
    getOneUser
}