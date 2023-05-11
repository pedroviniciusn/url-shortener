import Bcrypt from "bcryptjs";
import { AppError } from "../../../../errors/AppError";
import { ICreateUser } from "../../dtos/ICreateUser";
import { UserRepository } from "../../repositories/implementations/UserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository
  ) {}

  async execute({ name, email, password }: ICreateUser) {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await Bcrypt.hash(password, 8);

    await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });
  }
}
