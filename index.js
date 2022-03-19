import express from "express";
import mongoose from "mongoose";
import { router } from "./authRoutes.js";

const PORT = process.env.PORT || 5000
const app = express()
const db = '*'

app.use(express.json())
 
app.use('/auth', router)

const start = async () => {
    try {
        await mongoose.connect(db)

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()