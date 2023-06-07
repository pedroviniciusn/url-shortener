import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUserReposiroty } from "../../repositories/IUserRepository";
import { UserMap } from "../../mapper/UserMap";
import { IUserResponse } from "../../dtos/IUserResponse";

interface IRequest {
  userId: string;
}

@injectable()
export class GetDataUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserReposiroty
  ) {}

  async execute({ userId }: IRequest): Promise<IUserResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found");
    }

    return UserMap.toMap(user);
  }
}
