import User from './models/User.js'
import Role from './models/Role.js'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import jsonwebtoken from 'jsonwebtoken'
import { config } from './config.js'

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jsonwebtoken.sign(payload, config.secret, {expiresIn: "2h"})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return res.status(400).json({ message: "Something go wrong", errors })
            }

            const { username, password } = req.body

            const candidate = await User.findOne({ username })

            if(candidate) {
                return res.status(400).json({ message: "User already registered" })
            }

            const hashedPassword = bcrypt.hashSync(password, 8);
            const userRole = await Role.findOne({ value: "User" })

            const user = User({ username, password: hashedPassword, role: [userRole.value] })

            await user.save()

            res.json({ message: "User successfully created!" })

        } catch (e) {
            console.log('Something go wrong with registration')
            res.status(400).json({ message: "Registration error" })
        }
    }

    async login(req, res) {
        try {

            const { username, password } = req.body

            const user = await User.findOne({ username })

            if(!user) {
                return res.status(400).json({ message: `User ${username} not found` })
            }

            const validPassword = bcrypt.compareSync(password, user.password)

            if(!validPassword) {
                return res.status(400).json({ message: "Incorrect password" })
            }

            const token = generateAccessToken(user._id, user.role)

            return res.json({token})
            
        } catch (e) {
            console.log('Something go wrong with login')
            res.status(400).json({ message: "Login error" })
        }
    }

    async getUsers(req, res) {
        try {
            
        } catch (e) {
            
        }
    }
}

export const controller = new authController