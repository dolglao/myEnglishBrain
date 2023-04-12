import mongoose from "mongoose"
import { findByIDService } from "../services/exercicios.service.js"

export const errorHandler = (func) => async (req, res, next) => {
    try {
        await func(req, res, next)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}

const isValidID = (req, res, next) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid id."})
    }

    req.id = id

    next()
}

const isValidUser = async (req, res, next) => {
    const id = req.id

    const exercicio = await findByIDService(id)

    if (!exercicio) {
        return res.status(400).send({ error: "User not found by id." })
    }

    req.exercicio = exercicio

    next()
}



// Exportar com errorHandler
const handlers = { isValidID, isValidUser}

for (const key in handlers) {
    handlers[key] = errorHandler(handlers[key])
}
export default { ...handlers }