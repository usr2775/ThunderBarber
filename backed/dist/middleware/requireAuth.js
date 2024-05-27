"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
// Middleware to check if the request is authenticated
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { _id } = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        // Find the user in the database based on the extracted ID
        const user = yield userModel_1.default.findOne({ _id }).select('_id');
        // If user is not found, throw an error
        if (!user) {
            throw new Error('User not found');
        }
        // Attach the user ID to the request object for further use
        req.user = { _id: user._id };
        // Call the next middleware in the chain
        next();
    }
    catch (error) {
        // If any error occurs during the authentication process, return an error response
        console.error(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
});
// Export the middleware
exports.default = requireAuth;
