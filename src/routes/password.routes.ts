import { Router } from "express";
import { ResetPasswordUserController } from "../modules/accounts/useCases/resetPasswordUserUseCase/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "../modules/accounts/useCases/sendForgotPasswordMail/sendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handler);

passwordRoutes.post("/reset/:token", resetPasswordUserController.handler);

export { passwordRoutes };
