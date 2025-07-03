import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Route setup
app.use('/api/user', userRoutes);

export default app;
