const Appointment = require('../models/appointmentModel');
const mongoose = require('mongoose');

const currentDate = new Date();
const checkIfPast = (inputDate) => {
    const givenDate = new Date(inputDate);
    return givenDate < currentDate;
};

// Get all appointments for a specific user
const getAppointments = async (req, res) => {
    const user_id = req.user._id;

    try {
        let appointments = await Appointment.find({ user_id }).sort({ date: 1 });

        // Move past appointments to the end of the list
        const pastAppointments = [];
        appointments = appointments.filter(appointment => {
            const dateTime = new Date(appointment.date);
            if (checkIfPast(dateTime)) {
                pastAppointments.push(appointment);
                return false;
            }
            return true;
        });

        appointments = [...appointments, ...pastAppointments];
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all appointments for a specific barber
const getAppointmentsForBarber = async (req, res) => {
    const { barber } = req.params;

    try {
        const appointments = await Appointment.find({ barber }).sort({ date: 1 });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({}).populate('user', 'name');
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get a single appointment
const getAppointment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No hay cita' });
    }

    const appointment = await Appointment.findById(id);

    if (!appointment) {
        return res.status(404).json({ error: 'No hay cita' });
    }

    res.status(200).json(appointment);
};

// Create new appointment
const createAppointment = async (req, res) => {
    const { appointee, date, barber } = req.body;

    let emptyFields = [];

    if (!appointee) {
        emptyFields.push('appointee');
    }
    if (!date) {
        emptyFields.push('date');
    }
    if (!barber) {
        emptyFields.push('barber');
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Por favor rellena todos los campos', emptyFields });
    }

    const bookedAppointment = await Appointment.findOne({ date, barber });

    if (bookedAppointment) {
        return res.status(400).json({ error: 'Por favor rellena todos los campos' });
    }

    if (checkIfPast(date)) {
        return res.status(400).json({ error: 'La fecha ha pasado' });
    }

    try {
        const user_id = req.user._id;
        const appointment = await Appointment.create({ appointee, date, barber, user_id });
        res.status(200).json(appointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No hay cita' });
    }

    const appointment = await Appointment.findOneAndDelete({ _id: id });

    if (!appointment) {
        return res.status(404).json({ error: 'No hay cita' });
    }

    res.status(200).json(appointment);
};

// Update an appointment
const updateAppointment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No hay cita' });
    }

    const appointment = await Appointment.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!appointment) {
        return res.status(400).json({ error: 'No hay cita' });
    }

    res.status(200).json(appointment);
};

module.exports = {
    getAppointment,
    getAppointments,
    createAppointment,
    deleteAppointment,
    updateAppointment,
    getAppointmentsForBarber,
    getAllAppointments
};
