import { InMemoryUserTokenRepository } from "../../repositories/implementations/in-memory/InMemoryUserTokenRepository";
import { DateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DateProvider";
import { InMemoryUserRepository } from "../../repositories/implementations/in-memory/InMemoryUserRepository";
import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUser } from "../../dtos/ICreateUser";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";
import { AppError } from "../../../../errors/AppError";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryUserTokenRepository: InMemoryUserTokenRepository;
let createUserUseCase: CreateUserUseCase;
let resetPasswordUserUseCase: ResetPasswordUserUseCase;
let dateProvider: DateProvider;

describe("Reset Password", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryUserTokenRepository = new InMemoryUserTokenRepository();
    dateProvider = new DateProvider();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
    resetPasswordUserUseCase = new ResetPasswordUserUseCase(
      inMemoryUserRepository,
      inMemoryUserTokenRepository,
      dateProvider
    );
  });

  it("Should be able to reset password", async () => {
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

    const user = await inMemoryUserRepository.findByEmail(userTest.email);

    const token = nanoid();

    await inMemoryUserTokenRepository.create({
      token,
      user_id: user.id,
      expires_date: dateProvider.addHours(1),
    });

    const newPassword = "123test";

    await resetPasswordUserUseCase.execute({ token, password: newPassword });

    const { password } = await inMemoryUserRepository.findByEmail(user.email);

    expect(await bcrypt.compare(newPassword, password)).toEqual(true);
  });

  it("Should not be able to reset password if the token is invalid", async () => {
    expect(async () => {
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

      const user = await inMemoryUserRepository.findByEmail(userTest.email);

      const token = nanoid();

      await inMemoryUserTokenRepository.create({
        token,
        user_id: user.id,
        expires_date: dateProvider.addHours(1),
      });

      const tokenInvalid = nanoid();

      await resetPasswordUserUseCase.execute({
        token: tokenInvalid,
        password: "123test",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
