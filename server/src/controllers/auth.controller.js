import { errorHandler } from "../middlewares/global.midlleware.js"
import bcrypt from "bcrypt"
import { loginService, generateToken } from "../services/auth.service.js"


const login = async (req, res) => {
    const { email, password } = req.body
    
    const user = await loginService(email)

    const isPasswordValid = bcrypt.compareSync(password, user.password)

    const token = generateToken(user.id)

    if (!user || !isPasswordValid) {
        return res.status(404).send({error: "E-mail ou senha inválida"})
    } else {
        return res.status(200).send({ "login": isPasswordValid, "user": user , "token": token})
    }

    
}


// Exportar com errorHandler
const handlers = { login }

for (const key in handlers) {
    handlers[key] = errorHandler(handlers[key])
}
export default { ...handlers }