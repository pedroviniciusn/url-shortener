import { ICreateUser } from "../../dtos/ICreateUser";
import { InMemoryUserRepository } from "../../repositories/implementations/in-memory/InMemoryUserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

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
});
