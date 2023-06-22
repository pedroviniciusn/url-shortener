import { nanoid } from "nanoid";
import { ICreateNewUrl } from "../../dtos/ICreateNewUrl";
import { InMemoryUrlsRepository } from "../../repositories/implementations/in-memory/InMemoryUrlsRepository";
import { CreateNewUrlUseCase } from "../createNewUrl/CreateNewUrlUseCase";
import { RedirectUrlUseCase } from "./RedirectUrlUseCase";
import { AppError } from "../../../../errors/AppError";

let inMemoryUrlsRepository: InMemoryUrlsRepository;
let createNewUrlUseCase: CreateNewUrlUseCase;
let redirectUrlUseCase: RedirectUrlUseCase;

describe("Redirect URL", () => {
  beforeEach(() => {
    inMemoryUrlsRepository = new InMemoryUrlsRepository();
    createNewUrlUseCase = new CreateNewUrlUseCase(inMemoryUrlsRepository);
    redirectUrlUseCase = new RedirectUrlUseCase(inMemoryUrlsRepository);
  });

  it("Should be able to redirect a URL", async () => {
    const { url, userId }: ICreateNewUrl = {
      url: "https://jestjs.io/pt-BR/",
      userId: nanoid(),
    };

    await createNewUrlUseCase.execute({ url, userId });

    const urlCreated = await inMemoryUrlsRepository.findUrl(url);

    const urlRedirect = await redirectUrlUseCase.execute({
      newUrl: urlCreated[0].new_url,
    });

    expect(urlRedirect).toEqual(url);
  });

  it("Should not be able to redirect a URL if the new URL is not exists", async () => {
    expect(async () => {
      await redirectUrlUseCase.execute({ newUrl: nanoid(5) });
    }).rejects.toBeInstanceOf(AppError);
  });
});
