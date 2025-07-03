import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { check } from 'express-validator';

const router = Router();

router.post(
  '/register',
  [
    check('name').notEmpty().withMessage('Name is required').trim().escape(),
    check('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    check('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
    check('age').isInt({ min: 18 }).withMessage('Must be at least 18 years old')
  ],
  registerUser
);

router.post('/login', loginUser);

export default router;
