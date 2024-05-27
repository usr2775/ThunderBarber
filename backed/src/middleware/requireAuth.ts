// Import necessary modules and types
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';

// Define the structure of JWT payload
interface JwtPayload {
    _id: string;
}

// Middleware to check if the request is authenticated
const requireAuth = async (req: any, res: Response, next: NextFunction) => {
    // Extract the authorization token from the request headers
    const { authorization } = req.headers;

    // If no authorization token is provided, return an error response
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    // Extract the token from the authorization header
    const token = authorization.split(' ')[1];

    try {
        // Verify the token and extract the user ID from it
        const { _id } = jwt.verify(token, process.env.SECRET!) as JwtPayload;

        // Find the user in the database based on the extracted ID
        const user = await User.findOne({ _id }).select('_id');

        // If user is not found, throw an error
        if (!user) {
            throw new Error('User not found');
        }

        // Attach the user ID to the request object for further use
        req.user = { _id: (user._id as unknown as string) };

        // Call the next middleware in the chain
        next();
    } catch (error) {
        // If any error occurs during the authentication process, return an error response
        console.error(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

// Export the middleware
export default requireAuth;

