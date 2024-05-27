// Import necessary modules and types from mongoose
import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

// Define the structure of the user document
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    barber?: string;
}

// Define the structure of the user model with custom static methods
interface IUserModel extends Model<IUser> {
    signup(firstName: string, lastName: string, email: string, password: string, barber?: string): Promise<IUser>;
    login(email: string, password: string): Promise<IUser>;
}

// Define the schema for the user document
const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    barber: {
        type: String,
    },
});

// Define static methods for user model: signup and login
userSchema.statics.signup = async function (firstName: string, lastName: string, email: string, password: string, barber?: string) {
    // Validation checks for required fields, email format, and password strength
    if (!email || !password || !firstName || !lastName) {
        throw new Error('All fields are required');
    }
    if (!validator.isEmail(email)) {
        throw new Error('Invalid email');
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password is not strong enough');
    }

    // Check if the email already exists in the database
    const exists = await this.findOne({ email });
    if (exists) {
        throw new Error('Email already in use');
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create and return the new user document
    const user = await this.create({ firstName, lastName, email, password: hash, barber });
    return user;
};

userSchema.statics.login = async function (email: string, password: string) {
    // Validation checks for email and password
    if (!email || !password) {
        throw new Error('All fields are required');
    }

    // Find the user document by email
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Incorrect username or password');
    }

    // Compare the provided password with the hashed password stored in the database
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('Incorrect username or password');
    }

    // Return the user document if the password is correct
    return user;
};

// Create and export the User model based on the schema
const User = mongoose.model<IUser, IUserModel>('User', userSchema);
export default User;
