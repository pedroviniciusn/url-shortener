import { IUserReposiroty } from "../../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { auth } from "../../../../config/auth";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserReposiroty
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect", 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect", 401);
    }

    const token = jwt.sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });

    const tokenReturn: IResponse = {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    };

    return tokenReturn;
  }
}
