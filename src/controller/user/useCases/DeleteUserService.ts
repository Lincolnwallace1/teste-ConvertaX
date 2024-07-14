import { Injectable, HttpStatus } from '@nestjs/common';
import UserRepository from '@model/user/repositorie/UserRepositorie';

import AppError from '@common/erros/AppError';

interface IRequest {
  id: number;
}

@Injectable()
class DeleteUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute({ id }: IRequest): Promise<void> {
    const user = await this.userRepository.get({ id, enabled: true });

    if (!user) {
      throw new AppError({
        name: 'User Not Found',
        errorCode: 'user_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    await this.userRepository.update(user.id, { enabled: false });
  }
}

export default DeleteUserService;
