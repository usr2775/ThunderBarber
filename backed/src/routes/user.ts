// Importing necessary modules and functions
import express from 'express';
import { signupUser, signupBarber, loginUser, getUsers, getUser } from '../controllers/UserController'; // Importing controller functions

const router = express.Router(); // Creating an instance of the express router

// Defining routes for user operations
router.post('/login', loginUser); // Route for user login
router.post('/signup', signupUser); // Route for user signup
router.post('/signup-barber', signupBarber); // Route for barber signup
router.get('/', getUsers); // Route to get all users
router.get('/:email', getUser); // Route to get a user by email

export default router; // Exporting the router
