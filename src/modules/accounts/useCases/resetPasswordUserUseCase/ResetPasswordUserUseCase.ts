import bcrypt from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IUserReposiroty } from "../../repositories/IUserRepository";
import { IUserTokenRepository } from "../../repositories/IUserTokenRepository";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRespository: IUserReposiroty,

    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,

    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ token, password }: IRequest) {
    const dateNow = this.dateProvider.dateNow();

    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("Token invalid!");
    }

    if (
      await this.dateProvider.compareIfBefore(userToken.expires_date, dateNow)
    ) {
      throw new AppError("Token expired!");
    }

    const user = await this.userRespository.findById(userToken.user_id);

    user.password = await bcrypt.hash(password, 8);

    await this.userRespository.update(user);

    await this.userTokenRepository.deleteById(userToken.id);
  }
}
