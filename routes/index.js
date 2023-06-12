import express from 'express';
import userRoutes from './users.route.js'
import productRoutes from './products.route.js'
import authMiddleware from '../middleware/auth.middleware.js';
// const log = (req, res, next) =>{
//     console.log(req.method);
//     next();
// }

const router = express.Router();

router.use('/users', userRoutes)

router.use('/products', authMiddleware, productRoutes)

export default router;