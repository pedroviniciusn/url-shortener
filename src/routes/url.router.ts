import { DeleteNewUrlController } from "../modules/urls/useCases/deleteNewUrl/DeleteNewUrlController";
import { Router } from "express";
import { CreateNewUrlController } from "../modules/urls/useCases/createNewUrl/CreateNewUrlController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const urlRoutes = Router();

const createNewUrlController = new CreateNewUrlController();
const deleteNewUrlController = new DeleteNewUrlController();

urlRoutes.post("/newurl", ensureAuthenticated, createNewUrlController.handler);

urlRoutes.delete(
  "/:newurl",
  ensureAuthenticated,
  deleteNewUrlController.handler
);

export { urlRoutes };
