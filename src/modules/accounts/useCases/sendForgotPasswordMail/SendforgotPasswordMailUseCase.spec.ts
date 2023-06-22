import { AppError } from "../../../../errors/AppError";
import { ICreateUser } from "../../../../modules/accounts/dtos/ICreateUser";
import { InMemoryUserRepository } from "../../../../modules/accounts/repositories/implementations/in-memory/InMemoryUserRepository";
import { InMemoryUserTokenRepository } from "../../../../modules/accounts/repositories/implementations/in-memory/InMemoryUserTokenRepository";
import { DateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DateProvider";
import { MailProvider } from "../../../../shared/container/providers/MailProvider/implementations/MailProvider";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryUserTokenRepository: InMemoryUserTokenRepository;
let createUserUseCase: CreateUserUseCase;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let dateProvider: DateProvider;
let mailProvider: MailProvider;

describe("Send Forgot Password Mail", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryUserTokenRepository = new InMemoryUserTokenRepository();
    dateProvider = new DateProvider();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
    mailProvider = new MailProvider();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      inMemoryUserRepository,
      inMemoryUserTokenRepository,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send forgot password mail", async () => {
    const { name, email, password }: ICreateUser = {
      name: "User Test",
      email: "user@test.com",
      password: "test123",
    };

    await createUserUseCase.execute({
      name,
      email,
      password,
    });

    let response = await sendForgotPasswordMailUseCase.execute(email);

    expect(response).toHaveProperty("token");
  }, 7000);

  it("Should not be able to send forgot password mail if email not exists", async () => {
    expect(async () => {
      await sendForgotPasswordMailUseCase.execute("user@testerror.com");
    }).rejects.toBeInstanceOf(AppError);
  });
});
