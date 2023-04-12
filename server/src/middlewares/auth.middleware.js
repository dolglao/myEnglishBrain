import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { errorHandler } from "./global.midlleware.js"
import { findByIDService } from "../services/user.service.js"

dotenv.config()

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).send({ message: "Authorization vazia." })
    }

    const parts = authorization.split(" ")

    if (parts.length !== 2) {
        return res.status(401).send({ message: "Falta schema ou token." })
    }

    const [schema, token] = parts

    if (schema !== "Bearer") {
        return res.status(401).send({ message: "Schema não é Bearer." })
    }

    let decoded
    try {
        decoded = jwt.verify(token, process.env.SECRET_JWT)
    } catch (error) {
        return res.status(401).send({ message: "Token inválido ou expirado." })
    }

    const user = await findByIDService(decoded.id)
    if (!user) {
        return res.status(401).send({ message: "User não encontado. (TOKEN INVÁLIDO)" })
    }

    req.id = decoded.id

    return next()

}


// Exportar com errorHandler
const handlers = { authMiddleware }

for (const key in handlers) {
    handlers[key] = errorHandler(handlers[key])
}
export default { ...handlers }