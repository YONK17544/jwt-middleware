import express from 'express';
import { createUser, deleteUser, getUsers, updateUser, registerUser, loginUser } from "../controllers/users.controller.js"

const router = express.Router();

//CRUD
//READ

router.get('/', getUsers)

//put/patch

//CREATE
router.post('/', createUser);

//UPDATE
router.patch('/:id', updateUser)

//DELETE
router.delete('/:userId', deleteUser)

router.post('/register', registerUser)

router.post('/login', loginUser)

export default router;