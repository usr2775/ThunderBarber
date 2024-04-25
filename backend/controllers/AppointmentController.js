const Appointment = require('../models/appointmentModel')
const mongoose = require ('mongoose')

const currentDate = new Date();
const checkIfPast = (inputDate) => {
    const givenDate = new Date(inputDate);
    return(givenDate < currentDate);

  };
//get all appointments
const getAppointments = async (req, res) => {
    const user_id = req.user._id

    

    const appointments = await Appointment.find({ user_id }).sort({date: 1})
    
    appointments.forEach(function(appointment){
        const dateTime = new Date(appointment.date);
        if(checkIfPast(dateTime)){
            appointments.splice(appointments.indexOf(appointment), 1)
            appointments.push(appointment);
        
        }
    });


    res.status(200).json(appointments)
}

//get all appointments
const getAppointmentsforBarber = async (req, res) => {
    const { barber } = req.params

    const appointments = await Appointment.find({ barber: barber }).sort({date: 1})

    res.status(200).json(appointments)
}

//get a single appointment
const getAppointment = async (req, res) => {

    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such appointment'})
    }

    const appointment = await Appointment.findById(id)

    if(!appointment){
        return res.status(404).json({error: 'No such appointment'})
    }

    res.status(200).json(appointment)
}



//create new appointment
const createAppointment = async (req, res) => {
    const {appointee, date, barber} = req.body

    let emptyFields = []




    if(!appointee) {
        emptyFields.push('appointee')
        res.status(400).json({ error: 'Please fill in appointee field'})
    }
    if(!date) {
        emptyFields.push('date')
        res.status(400).json({ error: 'Please fill in date field'})
    }
    if(!barber) {
        emptyFields.push('barber')
        res.status(400).json({ error: 'Please fill in time field'})
    }

    const bookedAppointment = await Appointment.findOne({ date: date, barber: barber })
    // console.log(bookedAppointment)

    if(bookedAppointment){
        return res.status(400).json({error: 'Appointment already booked'})
    }

    if(checkIfPast(date)){
        return res.status(400).json({ error: 'Date has passed'})
    }

    try { 
        const user_id = req.user._id
        const appointment = await Appointment.create({ appointee, date, barber, user_id })
        res.status(200).json(appointment)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a appointment
const deleteAppointment = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such appointment'})
    }

    const appointment = await Appointment.findOneAndDelete({_id: id})

    if(!appointment){
        return res.status(404).json({error: 'No such appointment'})
    }

    res.status(200).json(appointment)
}

//update a appointment
const updateAppointment = async (req, res) => {
    const { id }  = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such appointment'})
    }

    const appointment = await Appointment.findOneAndUpdate({_id: id}, {
        ...req.body
      })

    if(!appointment){
        return res.status(400).json({error: 'No such appointment'})
    }

    res.status(200).json(appointment)
}


module.exports = {
    getAppointment,
    getAppointments,
    createAppointment,
    deleteAppointment,
    updateAppointment,
    getAppointmentsforBarber
}