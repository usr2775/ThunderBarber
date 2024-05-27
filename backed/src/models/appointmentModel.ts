// Import necessary modules and types from mongoose
import mongoose, { Document, Schema } from 'mongoose';

// Define the structure of the appointment document
export interface IAppointment extends Document {
    appointee: string;
    date: Date;
    barber: string;
    user_id: string;
}

// Define the schema for the appointment document
const appointmentSchema = new Schema<IAppointment>({
    appointee: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    barber: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Include timestamps for createdAt and updatedAt fields

// Create and export the Appointment model based on the schema
export default mongoose.model<IAppointment>('Appointment', appointmentSchema);
