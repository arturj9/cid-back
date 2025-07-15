import type { UserRepository } from 'repository/interface/UserRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from 'env';
import { ArgumentNotValidError } from 'service/error/ArgumentNotValidError';

interface AuthUserServiceRequest {
  email: string;
  password: string;
}

interface AuthUserServiceResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export class AuthUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthUserServiceRequest): Promise<AuthUserServiceResponse> {
    const isEmailInUse = await this.userRepository.findByEmail(email);

    if (!isEmailInUse) {
      throw new ArgumentNotValidError('Credenciais inválidas');
    }

    const passwordMatch = await bcrypt.compare(
      password,
      isEmailInUse.password || '',
    );

    if (!passwordMatch) {
      throw new ArgumentNotValidError('Credenciais inválidas');
    }

    const token = jwt.sign(
      {
        subject: isEmailInUse.id,
        expiresIn: '1d',
      },
      env.JWT_SECRET,
    );

    return {
      token,
      user: {
        id: isEmailInUse.id,
        name: isEmailInUse.name,
        email: isEmailInUse.email,
      },
    };
  }
}