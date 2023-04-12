import user from "../models/user.model.js"


const createService = (body) => user.create(body)

const findAllService = () => user.find()

const findByIDService = (id) => user.findById(id)

const updateByIDService = (id, name, email, password) => user.findOneAndUpdate({ _id: id }, {id, name, email, password})

export { createService, findAllService, findByIDService, updateByIDService }