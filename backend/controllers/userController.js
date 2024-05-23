const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '5d' })
}

const getUsers = async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 })

    res.status(200).json(users)
}

const getUser = async (req, res) => {

    const { email } = req.params
    const user = await User.findOne({ email })

    if (!user) {
        return res.status(404).json({ error: 'Este usuario no existe' })
    }

    res.status(200).json(user)
}


// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        // create token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// signup user
const signupUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    try {
        const user = await User.signup(firstName, lastName, email, password)

        // create token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// signup barber
const signupBarber = async (req, res) => {
    const { firstName, lastName, email, password, barber } = req.body

    try {
        const user = await User.signup(firstName, lastName, email, password, barber)

        // create token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = { signupUser, signupBarber, loginUser, getUsers, getUser }