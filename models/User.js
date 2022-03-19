import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: [{type: String, ref: 'Role'}]
})

export default mongoose.model('User', userSchema)