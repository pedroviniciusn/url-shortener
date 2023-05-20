import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
  async handler(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;

    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    await deleteUserUseCase.execute({ userId });

    return res.status(200).json({
      message: "Account Deleted",
    });
  }
}
