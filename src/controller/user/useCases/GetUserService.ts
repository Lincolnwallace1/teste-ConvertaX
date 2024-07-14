import { Injectable, HttpStatus } from '@nestjs/common';
import UserRepository from '@model/user/repositorie/UserRepositorie';
import AppError from '@common/erros/AppError';

import User from '@entities/User';

interface IRequest {
  id: number;
}

@Injectable()
class GetUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute({ id }: IRequest): Promise<User> {
    const user = await this.userRepository.get({ id, enabled: true });

    if (!user) {
      throw new AppError({
        name: 'User Not Found',
        errorCode: 'user_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return user;
  }
}

export default GetUserService;
