import { InMemoryUserRepository } from "../../repositories/implementations/in-memory/InMemoryUserRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { AppError } from "../../../../errors/AppError";
import { ICreateUser } from "../../dtos/ICreateUser";
import { nanoid } from "nanoid";

let inMemoryUserRepository: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;
let deleteUserUseCase: DeleteUserUseCase;

describe("Delete User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
    deleteUserUseCase = new DeleteUserUseCase(inMemoryUserRepository);
  });

  it("Should be able to delete a user", async () => {
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

    await deleteUserUseCase.execute({ userId: userCreated.id });

    const checkUserDeleted = await inMemoryUserRepository.findByEmail(
      user.email
    );

    expect(checkUserDeleted).toBeUndefined();
  });

  it("Should not be able to delete an nonexistent user", async () => {
    expect(async () => {
      const id = nanoid();

      await deleteUserUseCase.execute({ userId: id });
    }).rejects.toBeInstanceOf(AppError);
  });
});
