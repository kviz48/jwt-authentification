import express from "express";
import mongoose from "mongoose";
import { router } from "./authRoutes.js";

const PORT = process.env.PORT || 5000
const app = express()
const db = 'mongodb+srv://root:root@cluster0.h0o0l.mongodb.net/mern-course?retryWrites=true&w=majority'

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