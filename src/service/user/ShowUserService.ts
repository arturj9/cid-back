import type { UserRepository } from 'repository/interface/UserRepository';
import { ArgumentNotValidError } from '../error/ArgumentNotValidError';
import type { UserType } from 'types/UserTypes';

interface ShowUserServiceRequest {
  id: string;
}

interface ShowUserServiceResponse {
  user: UserType;
}

export class ShowUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
  }: ShowUserServiceRequest): Promise<ShowUserServiceResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ArgumentNotValidError('Usuário não encontrado');
    }

    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword };
  }
}