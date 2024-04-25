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
userSchema.statics.signup = async function(firstName, lastName, email, password, barber) {
    
    // validation
    if(!email || !password || !firstName || !lastName ){
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }
    
    const exists = await this.findOne({ email })

    if(exists){
        throw Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ firstName, lastName, email, password: hash, barber})

    return user
}

// static login method
userSchema.statics.login = async function(email, password){

    
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if(!user){
        throw Error("Incorrect Email")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Invalid Password')
    }

    return user
}
module.exports = mongoose.model('User', userSchema)