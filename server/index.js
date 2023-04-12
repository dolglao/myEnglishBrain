// NATIVE //////////////////////////////////////////
import express, { json } from "express"
import dotenv from "dotenv"
import cors from 'cors';
////////////////////////////////////////////////////

// CUSTOM //////////////////////////////////////////
import connectDatabase from "./src/database/db.js"

// rotas
import userRoute from "./src/routes/user.route.js"
import authRoute from "./src/routes/auth.route.js"
import exerciciosRoute from "./src/routes/exercicios.route.js"
import dadosRoute from "./src/routes/dados.route.js"

///////////////////////////////////////////////////

dotenv.config()

const app = express()
app.use(cors());
const port = process.env.PORT || 3000

connectDatabase()

app.use(json())
app.use("/user", userRoute)
app.use("/auth", authRoute)
app.use("/exercicios", exerciciosRoute)
app.use("/enviar", dadosRoute)

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}.`)
})