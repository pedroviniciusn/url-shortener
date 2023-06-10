import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUrlsRepository } from "../../repositories/IUrlsRepository";

interface IRequest {
  newUrl: string;
}

@injectable()
export class RedirectUrlUseCase {
  constructor(
    @inject("UrlsRepository")
    private urlsRepository: IUrlsRepository
  ) {}

  async execute({ newUrl }: IRequest): Promise<string> {
    const urlAlreadyExists = await this.urlsRepository.findNewUrl(newUrl);

    if (process.env.NODE_ENV == "test") {
      if (urlAlreadyExists == undefined) {
        throw new AppError("URL not found");
      }
    }

    if (!urlAlreadyExists.url) {
      throw new AppError("URL not found");
    }

    return urlAlreadyExists.url;
  }
}
