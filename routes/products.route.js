 import express from 'express';
 import { getProducts, postProducts, getProductsById, deleteProductById } from '../controllers/products.controller.js';
 import authMiddleware from '../middleware/auth.middleware.js';

 const router = express.Router();

 router.get("/", getProducts);

 router.post("/", postProducts);

 router.get("/fetch/:id", getProductsById);

 router.delete("/delete/:id", deleteProductById);

 export default router;