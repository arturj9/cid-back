import type { UserRepository } from 'repository/interface/UserRepository';
import bcrypt from 'bcryptjs';
import { ArgumentNotValidError } from '../error/ArgumentNotValidError';
import { User } from 'generated/prisma';

interface UpdateUserServiceRequest {
  name?: string;
  email?: string;
  password?: string;
  id: string;
}

interface UpdateUserServiceResponse {
  user: User;
}

export class UpdateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    name,
    password,
    id,
  }: UpdateUserServiceRequest): Promise<UpdateUserServiceResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ArgumentNotValidError('Usuário não encontrado');
    }

    if (email && email !== user.email) {
      const emailIsUsed = await this.userRepository.findByEmail(email);
      if (emailIsUsed) {
        throw new ArgumentNotValidError('Email já cadastrado');
      }
    }

    const updatedData: Partial<User> = {
      ...(email && { email }),
      ...(name && { name }),
      ...(password && { password: await bcrypt.hash(password, 6) }),
    };

    const updatedUser = await this.userRepository.update({
      ...user,
      ...updatedData,
    });

    return { user: updatedUser };
  }
}