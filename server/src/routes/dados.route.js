import { Router } from 'express';
import dadosController from "../controllers/dados.controller.js"
import dadosMiddleware from "../middlewares/dados.middleware.js"



const route = Router();
route.post("/", dadosController.create)
route.get("/", dadosController.findAll)



export default route