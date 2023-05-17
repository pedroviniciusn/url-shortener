import { inject, injectable } from "tsyringe";
import { nanoid } from "nanoid";
import { AppError } from "../../../../errors/AppError";
import { IUrlsRepository } from "../../repositories/IUrlsRepository";

interface IRequest {
  url: string;
  userId: string;
}

@injectable()
export class CreateNewUrlUseCase {
  constructor(
    @inject("UrlsRepository")
    private urlsRepository: IUrlsRepository
  ) {}

  async execute({ url, userId }: IRequest): Promise<void> {
    const urlAlreadyExists = await this.urlsRepository.findUrl(url);

    if (urlAlreadyExists) {
      urlAlreadyExists.map((item) => {
        if (item.userId == userId) {
          throw new AppError("URL has already been formatted", 422);
        }
      });
    }

    const newUrl = nanoid(5);

    const newUrlAlreadyExists = await this.urlsRepository.findNewUrl(newUrl);

    if (newUrlAlreadyExists) {
      throw new AppError("Please, try again");
    }

    await this.urlsRepository.create({ url, newUrl, userId });
  }
}
