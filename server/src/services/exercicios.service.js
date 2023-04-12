import exercicio from "../models/exercicios.model.js"

const createService = (body) => exercicio.create(body)

const findAllService = () => exercicio.find()

const findByIDService = (id) => exercicio.findById(id)

const updateByIDService = (id, grupo, exericio, series, repeticoes, intervalo, obs) => exercicio.findOneAndUpdate({ _id: id }, { id, grupo, exericio, series, repeticoes, intervalo, obs })

export { createService, findAllService, findByIDService, updateByIDService }