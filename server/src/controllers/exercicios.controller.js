import { createService, findAllService, updateByIDService } from "../services/exercicios.service.js"
import { errorHandler } from "../middlewares/global.midlleware.js"



const create = async (req, res) => {
    const { grupo, exercicio, series, repeticoes, intervalo, obs } = req.body

    if (!grupo || !exercicio || !series || !repeticoes || !intervalo) {
        res.status(400).send({ error: "Insira todos os campos para prosseguir." })
    }

    const exercicios = await createService(req.body)

    if (!exercicios) {
        return res.status(400).send({ message: "Erro ao criar o usuário." })
    }

    res.status(201).send({
        message: "Usuário criado com sucesso.",
        exercicio: exercicios
    })

}

const findAll = async (req, res) => {
    const exercicios = await findAllService()

    if (exercicios.length === 0) {
        return res.status(400).send({ error: "Não há exercícios cadastrados" })
    }

    res.status(200).send({exercicios})
}

const findByID = async (req, res) => {
    const exercicios = req.user


    res.status(200).send({ message: "Exercício encontrado pelo ID.", exercicios: exercicios })
}

const updateByID = async (req, res) => {
    const { grupo, exercicio, series, repeticoes, intervalo, obs } = req.body

    if (!exercicio && !series && !repeticoes && !intervalo && !obs) {
        res.status(400).send({ error: "Envie pelo menos um campo para executar a atualização." })
    }

    const { id } = req

    await updateByIDService(grupo, exercicio, series, repeticoes, intervalo, obs)

    res.status(200).send({ message: "Usuário atualizado com sucesso.", exercicio: exercicio })
}



// Exportar com errorHandler
const handlers = { create, findAll, findByID, updateByID }

for (const key in handlers) {
    handlers[key] = errorHandler(handlers[key])
}

export default { ...handlers }