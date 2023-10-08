// Be carefull to import and use hierarchy, it sometimes get crayz
import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
const port = process.env.PORT || 5100;
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// routes
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js'
// middlewares
import { authenticateUser } from './middleware/authMiddleware.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Show us request in detailed. (on development stage)
}

// Test route
app.get('/api/v1/test', (req,res) => {
    res.json({msg : 'test route'})
})

/* MIDDLEWARES */
app.use(cookieParser()) //
app.use(express.json()) // Accepts json format

/* ROUTES */
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter)
app.use('/api/v1/auth',  authRouter)


// NOT FOUND MIDDLEWARE
app.use('*', (req, res) => {
    res.status(404).json({ message: 'not found' });
});
// ERROR MIDDLEWARE // must be at the bottom to work
app.use(errorHandlerMiddleware)

/* MONGODB CONNECTION */
try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`server running on PORT ${port}....`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}