const mongoose= require('mongoose')

const Schema = mongoose.Schema

const appointmentSchema = new Schema({
    appointee: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        require: true
    },
    barber:{
        type: String,
        require: true
    },
    user_id: {
        type: String,
        require: true
    }

}, { timestamps: true})

module.exports = mongoose.model('Appointment', appointmentSchema)
