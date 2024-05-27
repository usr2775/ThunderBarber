"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentsforBarber = exports.updateAppointment = exports.deleteAppointment = exports.createAppointment = exports.getAppointments = exports.getAppointment = void 0;
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
const mongoose_1 = __importDefault(require("mongoose"));
// Function to check if a given date is in the past
const currentDate = new Date();
const checkIfPast = (inputDate) => {
    const givenDate = new Date(inputDate);
    return (givenDate < currentDate);
};
// Handler to get all appointments for a user
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const appointments = yield appointmentModel_1.default.find({ user_id }).sort({ date: 1 });
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
});
exports.getAppointments = getAppointments;
// Handler to get all appointments for a specific barber
const getAppointmentsforBarber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { barber } = req.params;
    const appointments = yield appointmentModel_1.default.find({ barber }).sort({ date: 1 });
    res.status(200).json(appointments);
});
exports.getAppointmentsforBarber = getAppointmentsforBarber;
// Handler to get a single appointment by ID
const getAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Appointment not found' });
    }
    const appointment = yield appointmentModel_1.default.findById(id);
    if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json(appointment);
});
exports.getAppointment = getAppointment;
// Handler to create a new appointment
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { appointee, date, barber } = req.body;
    // Validate required fields
    let emptyFields = [];
    if (!appointee)
        emptyFields.push('appointee');
    if (!date)
        emptyFields.push('date');
    if (!barber)
        emptyFields.push('barber');
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
    }
    // Check if the appointment is already booked
    const bookedAppointment = yield appointmentModel_1.default.findOne({ date, barber });
    if (bookedAppointment) {
        return res.status(400).json({ error: 'Appointment already booked' });
    }
    // Check if the date is in the past
    if (checkIfPast(new Date(date))) {
        return res.status(400).json({ error: 'The date is in the past' });
    }
    try {
        const user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        const appointment = yield appointmentModel_1.default.create({ appointee, date, barber, user_id });
        res.status(200).json(appointment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createAppointment = createAppointment;
// Handler to delete an appointment by ID
const deleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Appointment not found' });
    }
    const appointment = yield appointmentModel_1.default.findOneAndDelete({ _id: id });
    if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json(appointment);
});
exports.deleteAppointment = deleteAppointment;
// Handler to update an appointment by ID
const updateAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Appointment not found' });
    }
    const appointment = yield appointmentModel_1.default.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    if (!appointment) {
        return res.status(400).json({ error: 'Appointment not found' });
    }
    res.status(200).json(appointment);
});
exports.updateAppointment = updateAppointment;
