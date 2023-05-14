import bcrypt from "bcryptjs";
import { AppError } from "../../../../errors/AppError";
import { UserRepository } from "../../repositories/implementations/UserRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository
  ) {}

  async execute({ name, email, password }: IRequest) {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await bcrypt.hash(password, 8);

    await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });
  }
}
