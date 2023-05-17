import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";
import { auth } from "../config/auth";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = jwt.verify(token, auth.secret_token) as IPayload;

    const userRepository = new UserRepository();

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 401);
    }

    req.user = {
      id: userId,
    };

    next();
  } catch {
    throw new AppError("Invalid Token", 401);
  }
}
