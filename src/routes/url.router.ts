import { Router } from "express";
import { CreateNewUrlController } from "../modules/urls/useCases/createNewUrl/CreateNewUrlController";

const urlRoutes = Router();

const createNewUrlController = new CreateNewUrlController();

urlRoutes.post("/newurl", createNewUrlController.handler);

export { urlRoutes };
