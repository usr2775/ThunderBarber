// Import necessary modules and types
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

// Function to create a JWT token
const createToken = (_id: string) => {
    return jwt.sign({ _id }, process.env.SECRET!, { expiresIn: '5d' });
};

// Handler to get all users, sorted by creation date
export const getUsers = async (req: Request, res: Response) => {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
};

// Handler to get a single user by email
export const getUser = async (req: Request, res: Response) => {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ error: 'This user does not exist' });
    }

    res.status(200).json(user);
};

// Handler for user login
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id as string);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

// Handler for user signup
export const signupUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await User.signup(firstName, lastName, email, password);
        const token = createToken(user._id as string);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

// Handler for barber signup
export const signupBarber = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, barber } = req.body;

    try {
        const user = await User.signup(firstName, lastName, email, password, barber);
        const token = createToken(user._id as string);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};
