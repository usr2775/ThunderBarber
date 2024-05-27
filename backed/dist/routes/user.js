"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing necessary modules and functions
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController"); // Importing controller functions
const router = express_1.default.Router(); // Creating an instance of the express router
// Defining routes for user operations
router.post('/login', UserController_1.loginUser); // Route for user login
router.post('/signup', UserController_1.signupUser); // Route for user signup
router.post('/signup-barber', UserController_1.signupBarber); // Route for barber signup
router.get('/', UserController_1.getUsers); // Route to get all users
router.get('/:email', UserController_1.getUser); // Route to get a user by email
exports.default = router; // Exporting the router
