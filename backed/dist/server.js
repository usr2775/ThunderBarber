"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
// Import route handlers
const appointments_1 = __importDefault(require("./routes/appointments"));
const user_1 = __importDefault(require("./routes/user"));
dotenv_1.default.config(); // Load environment variables from .env file
const app = (0, express_1.default)(); // Create an instance of the Express application
app.use(express_1.default.json()); // Middleware to parse incoming JSON requests
// Middleware to log request path and method
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
// Route handlers for appointments and user routes
app.use('/api/appointments', appointments_1.default); // Use appointment routes with base path '/api/appointments'
app.use('/api/user', user_1.default); // Use user routes with base path '/api/user'
// Connect to MongoDB using Mongoose
mongoose_1.default.connect(process.env.MONGO_URI) // Connect to MongoDB using the URI from environment variables
    .then(() => {
    // Start the Express server once the database connection is established
    app.listen(process.env.PORT, () => {
        console.log(`Listening on Port ${process.env.PORT}`);
    });
})
    .catch((error) => {
    // Log any errors that occur during database connection
    console.error(error);
});
