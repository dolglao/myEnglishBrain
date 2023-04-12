import { Router } from 'express';
import userController from "../controllers/user.controller.js"
import globalMiddleware from "../middlewares/global.midlleware.js"
import authMiddleware from '../middlewares/auth.middleware.js';



const route = Router();
route.post("/", userController.create)
route.get("/", authMiddleware.authMiddleware, userController.findAll)
route.get("/:id", globalMiddleware.isValidID, globalMiddleware.isValidUser, userController.findByID)
route.patch("/:id", globalMiddleware.isValidID, globalMiddleware.isValidUser, userController.updateByID)



export default route