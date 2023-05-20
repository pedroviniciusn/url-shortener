import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateNewUrlUseCase } from "./CreateNewUrlUseCase";

export class CreateNewUrlController {
  async handler(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;
    const { url } = req.body;

    const createNewUrlUseCase = container.resolve(CreateNewUrlUseCase);

    await createNewUrlUseCase.execute({ url, userId });

    return res.status(201).json({
      message: "Created new URL",
    });
  }
}
