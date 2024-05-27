// Import necessary modules and functions
import express from 'express';
import { getAppointments, getAppointment, createAppointment, updateAppointment, deleteAppointment, getAppointmentsForBarber, getAllAppointments } from '../controllers/AppointmentController';
import requireAuth from '../../middleware/requireAuth';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(requireAuth);

// Define routes for appointment operations
router.get('/', getAppointments); // Get all appointments
router.get('/barber/:barber', getAppointmentsForBarber); // Get appointments for a specific barber
router.get('/all', getAllAppointments); // Get all appointments (no filter)
router.get('/:id', getAppointment); // Get appointment by ID
router.post('/', createAppointment); // Create a new appointment
router.delete('/:id', deleteAppointment); // Delete appointment by ID
router.patch('/:id', updateAppointment); // Update appointment by ID

// Export the router
export default router;
