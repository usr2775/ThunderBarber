// Import necessary modules and functions
import express from 'express';
import { signupUser, signupBarber, loginUser, getUsers, getUser } from '../../controllers/userController';

const router = express.Router();

// Define routes for user operations
router.post('/login', loginUser); // Login route
router.post('/signup', signupUser); // Signup route for users
router.post('/signup-barber', signupBarber); // Signup route for barbers
router.get('/', getUsers); // Get all users
router.get('/:email', getUser); // Get a user by email

// Export the router
export default router;

