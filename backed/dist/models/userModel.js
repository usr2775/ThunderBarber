"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
// Import necessary modules and types from mongoose
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
// Define the schema for the user document
const userSchema = new mongoose_1.Schema({
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
userSchema.statics.signup = function (firstName, lastName, email, password, barber) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validation checks for required fields, email format, and password strength
        if (!email || !password || !firstName || !lastName) {
            throw new Error('All fields are required');
        }
        if (!validator_1.default.isEmail(email)) {
            throw new Error('Invalid email');
        }
        if (!validator_1.default.isStrongPassword(password)) {
            throw new Error('Password is not strong enough');
        }
        // Check if the email already exists in the database
        const exists = yield this.findOne({ email });
        if (exists) {
            throw new Error('Email already in use');
        }
        // Hash the password before saving it to the database
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        // Create and return the new user document
        const user = yield this.create({ firstName, lastName, email, password: hash, barber });
        return user;
    });
};
userSchema.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validation checks for email and password
        if (!email || !password) {
            throw new Error('All fields are required');
        }
        // Find the user document by email
        const user = yield this.findOne({ email });
        if (!user) {
            throw new Error('Incorrect username or password');
        }
        // Compare the provided password with the hashed password stored in the database
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match) {
            throw new Error('Incorrect username or password');
        }
        // Return the user document if the password is correct
        return user;
    });
};
// Create and export the User model based on the schema
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
