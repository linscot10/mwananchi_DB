const express = require('express')
const {
    registerController,
    loginController,
    allUserController,
    getOneUser
} = require('../controllers/auth.controller')
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()

// router.use(protect)

router.post('/register', registerController)
router.post('/login',  loginController)
router.get('/getAllUser',protect,  allUserController)
router.get('/id/:id',protect, getOneUser)

module.exports = router