import type { UserRepository } from 'repository/interface/UserRepository';
import { ArgumentNotValidError } from '../error/ArgumentNotValidError';

interface DeleteUserServiceRequest {
  id: string;
  idLogged: string;
}

export class DeleteUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ id, idLogged }: DeleteUserServiceRequest) {
    const user = await this.userRepository.findById(id);

    if (id === idLogged) {
      throw new ArgumentNotValidError('Usuário não pode deletar a si mesmo');
    }

    if (!user) {
      throw new ArgumentNotValidError('Usuário não encontrado');
    }

    await this.userRepository.delete(id);
  }
}