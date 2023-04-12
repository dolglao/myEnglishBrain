import { createService, findAllService } from "../services/dados.service.js"
import { errorHandler } from "../middlewares/global.midlleware.js"



const create = async (req, res) => {
    const { data, exercicio_id, repeticoes, carga, cargaTotal, obs } = req.body

    if (!data || !exercicio_id || !repeticoes || !carga || !cargaTotal || !obs) {
        res.status(400).send({ error: "Insira todos os campos para prosseguir." })
    }

    const execucao = await createService(req.body)

    if (!execucao) {
        return res.status(400).send({ message: "Erro ao enviar o exercício." })
    }

    res.status(201).send({
        message: "Execução enviada com sucesso.",
        execucao: execucao
    })

}

const findAll = async (req, res) => {
    const execucoes = await findAllService()

    if (execucoes.length === 0) {
        return res.status(400).send({ error: "Não há exercícios cadastrados" })
    }

    res.status(200).send({ message: "Exercícios encontrados", execucoes: execucoes })
}



// Exportar com errorHandler
const handlers = { create, findAll }

for (const key in handlers) {
    handlers[key] = errorHandler(handlers[key])
}

export default { ...handlers }