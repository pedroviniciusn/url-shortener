import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { DeleteUserController } from "../modules/accounts/useCases/deleteUser/DeleteUserController";
import { GetDataUserController } from "../modules/accounts/useCases/getDataUser/GetDataUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const getDataUserController = new GetDataUserController();
const deleteUserController = new DeleteUserController();

userRoutes.get("/user", ensureAuthenticated, getDataUserController.handler);

userRoutes.post("/user", createUserController.handler);

userRoutes.delete("/user", ensureAuthenticated, deleteUserController.handler);

export { userRoutes };
