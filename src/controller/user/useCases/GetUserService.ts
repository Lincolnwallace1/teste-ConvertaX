import { Injectable, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import AppError from '@common/erros/AppError';

import User from '@entities/User';

interface IRequest {
  id: number;
}

@Injectable()
class GetUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async execute({ id }: IRequest): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
        enabled: true,
      },
    });

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
