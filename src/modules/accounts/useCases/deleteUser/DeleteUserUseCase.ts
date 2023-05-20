import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUserReposiroty } from "../../repositories/IUserRepository";

interface IRequest {
  userId: string;
}

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserReposiroty
  ) {}

  async execute({ userId }: IRequest) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found");
    }

    await this.userRepository.delete(user.id);
  }
}
