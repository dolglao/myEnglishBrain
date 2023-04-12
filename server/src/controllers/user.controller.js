import mongoose from "mongoose"
import { createService, findAllService, updateByIDService } from "../services/user.service.js"
import { errorHandler } from "../middlewares/global.midlleware.js"



const create = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400).send({ error: "Insira todos os campos para prosseguir. (name, email, password)" })
    }

    const user = await createService(req.body)

    if (!user) {
        return res.status(400).send({ message: "Erro ao criar o usuário." })
    }

    res.status(201).send({
        message: "Usuário criado com sucesso.",
        user: { id: user._id, name, email}
    })

}

const findAll = async (req, res) => {
    const users = await findAllService()

    if (users.lenth === 0) {
        return res.status(400).send({ error: "Não há usuários cadastrados" })
    }

    res.status(200).send({ message: "Usuários encontrados", users: users})
}

const findByID = async (req, res) => {
    const user = req.user


    res.status(200).send({ message: "Usuário encontrado pelo ID.", user: user })
}

const updateByID = async (req, res) => {
    const { name, email, password } = req.body

    if (!name && !email && !password) {
        res.status(400).send({ error: "Envie pelo menos um campo para executar a atualização." })
    }

    const { id, user } = req

    await updateByIDService(id, name, email, password)

    res.status(200).send({ message: "Usuário atualizado com sucesso.", user: user })
}



// Exportar com errorHandler
const handlers = { create, findAll, findByID, updateByID }

for (const key in handlers) {
    handlers[key] = errorHandler(handlers[key])
}

export default { ...handlers }