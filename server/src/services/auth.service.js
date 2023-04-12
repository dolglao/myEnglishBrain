import user from "../models/user.model.js"
import jwt from "jsonwebtoken"

const loginService = (email) => user.findOne({email: email}).select("+password")

const generateToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86400})

export { loginService, generateToken}