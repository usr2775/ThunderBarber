const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const validator = require('validator')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    barber: {
        type: String,
    },
})

// static sign up method
userSchema.statics.signup = async function (firstName, lastName, email, password, barber) {

    // validation
    if (!email || !password || !firstName || !lastName) {
        throw Error('Todos los campos son obligatorios')
    }
    if (!validator.isEmail(email)) {
        throw Error('El correo no es válido')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('La contraseña no es lo suficientemente segura')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error("Correo electrónico ya en uso")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ firstName, lastName, email, password: hash, barber })

    return user
}

// static login method
userSchema.statics.login = async function (email, password) {


    if (!email || !password) {
        throw Error('Todos los campos son obligatorios')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error("Usuario o contraseña incorreto")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Usuario o contraseña incorreto')
    }

    return user
}
module.exports = mongoose.model('User', userSchema)