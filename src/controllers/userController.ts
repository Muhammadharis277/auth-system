import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import ActivityLog from '../models/activityModel';
import { AuthRequest } from '../middlewares/authMiddleware';
import { validationResult } from 'express-validator';

// Generate JWT Token
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
};

// @route   POST /api/auth/register
export const registerUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, age } = req.body;

    if (age < 18) {
        return res.status(400).json({ message: 'You must be at least 18 years old to register' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, age });
    const token = generateToken(user.id);

    // Log activity
    await ActivityLog.create({
        userId: user._id,
        action: 'Registered account',
        timestamp: new Date(),
    });

    res.status(201).json({ message: `${user.name} registered successfully!`, token });
};

// @route   POST /api/auth/login
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    // Log activity
    await ActivityLog.create({
        userId: user._id,
        action: 'Logged in',
        timestamp: new Date(),
    });

    res.json({ message: `Welcome ${user.name}`, token });
};

// @route   PUT /api/users/profile
export const updateProfile = async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user?.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, email, password } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();

    // Log activity
    await ActivityLog.create({
        userId: user._id,
        action: 'Updated profile',
        timestamp: new Date(),
    });

    res.json({ message: 'Profile updated', name: user.name });
};

// @route   PUT /api/users/password
export const updatePassword = async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user?.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) return res.status(400).json({ message: 'Current password incorrect' });

    user.password = newPassword;
    await user.save();

    // Log activity
    await ActivityLog.create({
        userId: user._id,
        action: 'Updated password',
        timestamp: new Date(),
    });

    res.json({ message: 'Password updated successfully' });
};

// @route   GET /api/users/activity
export const getActivityLogs = async (req: AuthRequest, res: Response) => {
    const logs = await ActivityLog.find({ userId: req.user?.id }).sort({ timestamp: -1 });
    res.json({
        message: `Activity logs for ${req.user?.name}`,
        logs,
    });
};
