import { InMemoryUserRepository } from "../../repositories/implementations/in-memory/InMemoryUserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { AppError } from "../../../../errors/AppError";
import { ICreateUser } from "../../dtos/ICreateUser";
import { jest } from "@jest/globals";

let inMemoryUserRepository: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  });

  it("Should be able to create a new user", async () => {
    const user: ICreateUser = {
      name: "User Test",
      email: "user@test.com",
      password: "test123",
    };

    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const userCreated = await inMemoryUserRepository.findByEmail(user.email);

    expect(userCreated.email).toEqual(user.email);
  });

  it("Should not be able to create a new user if the email is already registered", async () => {
    expect(async () => {
      const user1: ICreateUser = {
        name: "User Test",
        email: "user@test.com",
        password: "test123",
      };

      const user2: ICreateUser = {
        name: "User Test2",
        email: "user@test.com",
        password: "test123",
      };

      await createUserUseCase.execute({
        name: user1.name,
        email: user1.email,
        password: user1.password,
      });

      await createUserUseCase.execute({
        name: user2.name,
        email: user2.email,
        password: user2.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
