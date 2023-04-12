import dados from "../models/dados.model.js"

const createService = (body) => dados.create(body)

const findAllService = () => dados.find()

const findByIDService = (id) => dados.findById(id)

const updateByIDService = (id, grupo, exericio, series, repeticoes, intervalo, obs) => dados.findOneAndUpdate({ _id: id }, { id, grupo, exericio, series, repeticoes, intervalo, obs })

export { createService, findAllService, findByIDService, updateByIDService }