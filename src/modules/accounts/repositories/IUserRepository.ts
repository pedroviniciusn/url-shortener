import { User } from "@prisma/client";
import { ICreateUser } from "../dtos/ICreateUser";

export interface IUserReposiroty {
  create(data: ICreateUser): Promise<void>;
  delete(userId: string): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(userId: string): Promise<User | null>;
}
