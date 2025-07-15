import type { UserRepository } from "repository/interface/UserRepository";
import bcrypt from "bcryptjs";
import { ArgumentNotValidError } from "../error/ArgumentNotValidError";
import { User } from "generated/prisma";

interface CreateUserServiceRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserServiceResponse {
  user: User;
}

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new ArgumentNotValidError("Email já cadastrado");
    }

    const user = await this.userRepository.create({
      email,
      name,
      password: await bcrypt.hash(password, 8),
    });

    user.password = null;

    return { user };
  }
}
