import express from "express";
import { controller } from "./authController.js";
import { check } from "express-validator";

export const router = express.Router()

const regValidation = [
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password length must be more then 5 characters').isLength({ min: 5 })
]

router.post('/register', regValidation, controller.registration)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)