const express = require('express')

// Controller Functions
const {signupUser, signupBarber, loginUser, getUsers, getUser} = require('../controllers/userController')

const router  = express.Router()

// login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

//signup barber route
router.post('/signup-barber', signupBarber)

// Get All Users
router.get('/', getUsers)

// Delete a User by email
router.get('/:email', getUser)



module.exports = router
