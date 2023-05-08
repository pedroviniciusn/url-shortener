import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateNewUrlUseCase } from "../createNewUrl/CreateNewUrlUseCase";

export class DeleteNewUrlController {
  async handle(req: Request, res: Response) {
    const { newUrl } = req.params;

    const deleteNewUrlUseCase = container.resolve(CreateNewUrlUseCase);

    await deleteNewUrlUseCase.execute(newUrl);

    return res.status(200).json({
      message: "URL deleted!",
    });
  }
}
