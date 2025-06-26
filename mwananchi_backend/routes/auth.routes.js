const express = require('express')
const {registerController,loginController,allUserController,getOneUser} =require('../controllers/auth.controller')


const router = express.Router()

router.post('/register',registerController)
router.post('/login',loginController)
router.get('/getAllUser',allUserController)
router.get('/id/:id',getOneUser)

module.exports=router