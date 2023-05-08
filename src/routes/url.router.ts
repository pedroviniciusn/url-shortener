import { DeleteNewUrlController } from "../modules/urls/useCases/deleteNewUrl/DeleteNewUrlController";
import { Router } from "express";
import { CreateNewUrlController } from "../modules/urls/useCases/createNewUrl/CreateNewUrlController";

const urlRoutes = Router();

const createNewUrlController = new CreateNewUrlController();
const deleteNewUrlController = new DeleteNewUrlController();

urlRoutes.post("/newurl", createNewUrlController.handler);

urlRoutes.delete("/:newurl", deleteNewUrlController.handler);

export { urlRoutes };
