import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { GetDataUserController } from "../modules/accounts/useCases/getDataUser/GetDataUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const getDataUserController = new GetDataUserController();

userRoutes.post("/users", createUserController.handler);

userRoutes.get("/me", ensureAuthenticated, getDataUserController.handler);

export { userRoutes };
