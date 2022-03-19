import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
    value: {type: String, unique: true, default: "User"}
})

export default mongoose.model('Role', roleSchema)