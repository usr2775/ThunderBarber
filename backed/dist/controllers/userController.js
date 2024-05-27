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
exports.signupBarber = exports.signupUser = exports.loginUser = exports.getUser = exports.getUsers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
// Function to create a JWT token
const createToken = (_id) => {
    return jsonwebtoken_1.default.sign({ _id }, process.env.SECRET, { expiresIn: '5d' });
};
// Handler to get all users, sorted by creation date
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.default.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
});
exports.getUsers = getUsers;
// Handler to get a single user by email
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const user = yield userModel_1.default.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: 'This user does not exist' });
    }
    res.status(200).json(user);
});
exports.getUser = getUser;
// Handler for user login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.loginUser = loginUser;
// Handler for user signup
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = yield userModel_1.default.signup(firstName, lastName, email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.signupUser = signupUser;
// Handler for barber signup
const signupBarber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, barber } = req.body;
    try {
        const user = yield userModel_1.default.signup(firstName, lastName, email, password, barber);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.signupBarber = signupBarber;
