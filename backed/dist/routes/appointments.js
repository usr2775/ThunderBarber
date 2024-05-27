"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules and functions
const express_1 = __importDefault(require("express"));
const AppointmentController_1 = require("../controllers/AppointmentController"); // Import controller functions
const requireAuth_1 = __importDefault(require("../middleware/requireAuth")); // Import authentication middleware
// Create a router instance
const router = express_1.default.Router();
// Apply authentication middleware to all routes
router.use(requireAuth_1.default);
// Define routes for appointment operations
router.get('/', AppointmentController_1.getAppointments); // Route to get all appointments
router.get('/:id', AppointmentController_1.getAppointment); // Route to get a specific appointment by ID
router.get('/barber/:barber', AppointmentController_1.getAppointmentsforBarber); // Route to get appointments for a specific barber
router.post('/', AppointmentController_1.createAppointment); // Route to create a new appointment
router.delete('/:id', AppointmentController_1.deleteAppointment); // Route to delete an appointment by ID
router.patch('/:id', AppointmentController_1.updateAppointment); // Route to update an appointment by ID
// Export the router
exports.default = router;
