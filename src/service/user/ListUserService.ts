import type { UserRepository } from 'repository/interface/UserRepository';
import { UserType } from 'types/UserTypes';

interface ListUserServiceResponse {
  users: UserType[];
}

export class ListUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<ListUserServiceResponse> {
    const users = await this.userRepository.list();

    return { users };
  }
}