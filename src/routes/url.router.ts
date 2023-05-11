import { DeleteNewUrlController } from "../modules/urls/useCases/deleteNewUrl/DeleteNewUrlController";
import { Router } from "express";
import { CreateNewUrlController } from "../modules/urls/useCases/createNewUrl/CreateNewUrlController";

const urlRoutes = Router();

const createNewUrlController = new CreateNewUrlController();
const deleteNewUrlController = new DeleteNewUrlController();

urlRoutes.post("/:id/newurl", createNewUrlController.handler);

urlRoutes.delete("/:id/:newurl", deleteNewUrlController.handler);

export { urlRoutes };
