// Import necessary modules and types
import { Request, Response } from 'express';
import Appointment from '../models/appointmentModel';
import mongoose from 'mongoose';

// Function to check if a given date is in the past
const currentDate = new Date();
const checkIfPast = (inputDate: Date) => {
    const givenDate = new Date(inputDate);
    return (givenDate < currentDate);
};

// Handler to get all appointments for a user
const getAppointments = async (req: any, res: Response) => {
    const user_id = req.user?._id as string;

    const appointments = await Appointment.find({ user_id }).sort({ date: 1 });

    // Move past appointments to the end of the list
    appointments.forEach((appointment) => {
        const dateTime = new Date(appointment.date);
        if (checkIfPast(dateTime)) {
            const index = appointments.indexOf(appointment);
            appointments.splice(index, 1);
            appointments.push(appointment);
        }
    });

    res.status(200).json(appointments);
};

// Handler to get all appointments for a specific barber
const getAppointmentsforBarber = async (req: Request, res: Response) => {
    const { barber } = req.params;

    const appointments = await Appointment.find({ barber }).sort({ date: 1 });

    res.status(200).json(appointments);
};

// Handler to get a single appointment by ID
const getAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Appointment not found' });
    }

    const appointment = await Appointment.findById(id);

    if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json(appointment);
};

// Handler to create a new appointment
const createAppointment = async (req: any, res: Response) => {
    const { appointee, date, barber } = req.body;

    // Validate required fields
    let emptyFields: string[] = [];
    if (!appointee) emptyFields.push('appointee');
    if (!date) emptyFields.push('date');
    if (!barber) emptyFields.push('barber');
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
    }

    // Check if the appointment is already booked
    const bookedAppointment = await Appointment.findOne({ date, barber });
    if (bookedAppointment) {
        return res.status(400).json({ error: 'Appointment already booked' });
    }

    // Check if the date is in the past
    if (checkIfPast(new Date(date))) {
        return res.status(400).json({ error: 'The date is in the past' });
    }

    try {
        const user_id = req.user?._id as string;
        const appointment = await Appointment.create({ appointee, date, barber, user_id });
        res.status(200).json(appointment);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

// Handler to delete an appointment by ID
const deleteAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Appointment not found' });
    }

    const appointment = await Appointment.findOneAndDelete({ _id: id });

    if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json(appointment);
};

// Handler to update an appointment by ID
const updateAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Appointment not found' });
    }

    const appointment = await Appointment.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!appointment) {
        return res.status(400).json({ error: 'Appointment not found' });
    }

    res.status(200).json(appointment);
};

// Export the handlers
export {
    getAppointment,
    getAppointments,
    createAppointment,
    deleteAppointment,
    updateAppointment,
    getAppointmentsforBarber
};
