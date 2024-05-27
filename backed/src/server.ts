// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import route handlers
import appointmentRoutes from './routes/appointments';
import userRoutes from './routes/user';

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an instance of the Express application

app.use(express.json()); // Middleware to parse incoming JSON requests

// Middleware to log request path and method
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Route handlers for appointments and user routes
app.use('/api/appointments', appointmentRoutes); // Use appointment routes with base path '/api/appointments'
app.use('/api/user', userRoutes); // Use user routes with base path '/api/user'

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI!) // Connect to MongoDB using the URI from environment variables
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
