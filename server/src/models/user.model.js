import { Schema, model } from 'mongoose'
import bcrypt from "bcrypt"

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    }
})

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 8)
    next()
})

const user = model("user", userSchema)

export default user