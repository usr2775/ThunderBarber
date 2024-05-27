// Import necessary modules and functions
import express from 'express';
import {
    getAppointment,
    getAppointments,
    getAppointmentsforBarber,
    createAppointment,
    updateAppointment,
    deleteAppointment,
} from '../controllers/AppointmentController'; // Import controller functions
import requireAuth from '../middleware/requireAuth'; // Import authentication middleware

// Create a router instance
const router = express.Router();

// Apply authentication middleware to all routes
router.use(requireAuth);

// Define routes for appointment operations
router.get('/', getAppointments); // Route to get all appointments
router.get('/:id', getAppointment); // Route to get a specific appointment by ID
router.get('/barber/:barber', getAppointmentsforBarber); // Route to get appointments for a specific barber
router.post('/', createAppointment); // Route to create a new appointment
router.delete('/:id', deleteAppointment); // Route to delete an appointment by ID
router.patch('/:id', updateAppointment); // Route to update an appointment by ID

// Export the router
export default router;

