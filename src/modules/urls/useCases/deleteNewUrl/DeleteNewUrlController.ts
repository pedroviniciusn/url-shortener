import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteNewUrlUseCase } from "./DeleteNewUrlUseCase";

export class DeleteNewUrlController {
  async handler(req: Request, res: Response) {
    const { id: userId, newurl: newUrl } = req.params;

    const deleteNewUrlUseCase = container.resolve(DeleteNewUrlUseCase);

    await deleteNewUrlUseCase.execute({ newUrl, userId });

    return res.status(200).json({
      message: "URL deleted!",
    });
  }
}
