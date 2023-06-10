import { InMemoryUrlsRepository } from "../../repositories/implementations/in-memory/InMemoryUrlsRepository";
import { CreateNewUrlUseCase } from "./CreateNewUrlUseCase";
import { ICreateNewUrl } from "../../dtos/ICreateNewUrl";
import { AppError } from "../../../../errors/AppError";
import { nanoid } from "nanoid";

let inMemoryUrlsRepository: InMemoryUrlsRepository;
let createNewUrlUseCase: CreateNewUrlUseCase;

describe("Create New URL", () => {
  beforeEach(() => {
    inMemoryUrlsRepository = new InMemoryUrlsRepository();
    createNewUrlUseCase = new CreateNewUrlUseCase(inMemoryUrlsRepository);
  });

  it("Should be able to create a new URL", async () => {
    const { url, userId }: ICreateNewUrl = {
      url: "https://jestjs.io/pt-BR/",
      userId: nanoid(),
    };

    await createNewUrlUseCase.execute({ url, userId });

    const urlCreated = await inMemoryUrlsRepository.findUrl(url);

    expect(urlCreated[0].url).toEqual(url);
    expect(urlCreated[0].user_id).toEqual(userId);
  });

  it("Should not be able to create a new URL if URL is already formatted", async () => {
    expect(async () => {
      const { url, userId }: ICreateNewUrl = {
        url: "https://jestjs.io/pt-BR/",
        userId: nanoid(),
      };

      await createNewUrlUseCase.execute({ url, userId });

      await createNewUrlUseCase.execute({ url, userId });
    }).rejects.toBeInstanceOf(AppError);
  });
});
