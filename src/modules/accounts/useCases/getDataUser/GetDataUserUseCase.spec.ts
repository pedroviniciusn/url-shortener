import { InMemoryUserRepository } from "../../repositories/implementations/in-memory/InMemoryUserRepository";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { GetDataUserUseCase } from "./GetDataUserUseCase";
import { AppError } from "../../../../errors/AppError";
import { ICreateUser } from "../../dtos/ICreateUser";
import { nanoid } from "nanoid";

let inMemoryUserRepository: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let getDataUserUseCase: GetDataUserUseCase;

describe("Get Data User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUserRepository
    );
    getDataUserUseCase = new GetDataUserUseCase(inMemoryUserRepository);
  });

  it("Should be able to get data user", async () => {
    const userTest: ICreateUser = {
      name: "User Test",
      email: "user@test.com",
      password: "test123",
    };

    await createUserUseCase.execute({
      name: userTest.name,
      email: userTest.email,
      password: userTest.password,
    });

    const { token, user } = await authenticateUserUseCase.execute({
      email: userTest.email,
      password: userTest.password,
    });

    const userByEmail = await inMemoryUserRepository.findByEmail(user.email);

    const data = await getDataUserUseCase.execute({ userId: userByEmail.id });

    expect(data).toEqual(
      expect.objectContaining({
        id: userByEmail.id,
        name: userByEmail.name,
        email: userByEmail.email,
        password: userByEmail.password,
      })
    );
  });

  it("Should not be able to get data an nonexistent user", async () => {
    expect(async () => {
      const id = nanoid();

      await getDataUserUseCase.execute({ userId: id });
    }).rejects.toBeInstanceOf(AppError);
  });
});
