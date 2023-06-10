import { InMemoryUrlsRepository } from "../../repositories/implementations/in-memory/InMemoryUrlsRepository";
import { CreateNewUrlUseCase } from "../createNewUrl/CreateNewUrlUseCase";
import { DeleteNewUrlUseCase } from "./DeleteNewUrlUseCase";
import { ICreateNewUrl } from "../../dtos/ICreateNewUrl";
import { AppError } from "../../../../errors/AppError";
import { nanoid } from "nanoid";

let inMemoryUrlsRepository: InMemoryUrlsRepository;
let createNewUrlUseCase: CreateNewUrlUseCase;
let deleteNewUrlUseCase: DeleteNewUrlUseCase;

describe("Delete New URL", () => {
  beforeEach(() => {
    inMemoryUrlsRepository = new InMemoryUrlsRepository();
    createNewUrlUseCase = new CreateNewUrlUseCase(inMemoryUrlsRepository);
    deleteNewUrlUseCase = new DeleteNewUrlUseCase(inMemoryUrlsRepository);
  });

  it("Should be able to delete a URL", async () => {
    const { url, userId }: ICreateNewUrl = {
      url: "https://jestjs.io/pt-BR/",
      userId: nanoid(),
    };

    await createNewUrlUseCase.execute({ url, userId });

    const urlCreated = await inMemoryUrlsRepository.findUrl(url);

    await deleteNewUrlUseCase.execute({
      newUrl: urlCreated[0].new_url,
      userId,
    });

    expect(await inMemoryUrlsRepository.findUrl(url)).toEqual([undefined]);
  });

  it("Should not be able to delete a URL if URL is not formatted", async () => {
    expect(async () => {
      await deleteNewUrlUseCase.execute({
        newUrl: "urlerror.com",
        userId: nanoid(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
