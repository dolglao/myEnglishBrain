import { Router } from 'express';
import exerciciosController from "../controllers/exercicios.controller.js"
import exerciciosMiddleware from "../middlewares/exercicios.middleware.js"



const route = Router();
route.post("/", exerciciosController.create)
route.get("/", exerciciosController.findAll)
route.get("/:id", exerciciosMiddleware.isValidID, exerciciosMiddleware.isValidUser, exerciciosController.findByID)
route.patch("/:id", exerciciosMiddleware.isValidID, exerciciosMiddleware.isValidUser, exerciciosController.updateByID)



export default route