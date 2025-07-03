import { Router } from 'express';
import { check } from 'express-validator';
import { updateProfile, getActivityLogs, updatePassword } from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Update Profile with validation
router.put(
    '/profile',
    protect,
    [
        check('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
        check('email').optional().isEmail().normalizeEmail().withMessage('Valid email required'),
        check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    updateProfile
);

// View Activity Logs
router.get('/activity', protect, getActivityLogs);

// Update Password
router.put(
    '/password',
    protect,
    [
        check('currentPassword').notEmpty().withMessage('Current password required'),
        check('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
    ],
    updatePassword
);

export default router;
