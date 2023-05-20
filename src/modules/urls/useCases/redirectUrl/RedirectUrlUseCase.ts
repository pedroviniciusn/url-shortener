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
    const { url } = await this.urlsRepository.findNewUrl(newUrl);

    if (!url) {
      throw new AppError("URL not found");
    }

    return url;
  }
}
