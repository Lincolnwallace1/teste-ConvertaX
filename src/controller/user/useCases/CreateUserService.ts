import { Injectable, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Z from 'zod';
import * as argon2 from 'argon2';
import AppError from '@common/erros/AppError';

import User from '@entities/User';

import { CreateUserSchema } from '@views/user/schemas';

interface IRequest {
  data: Z.infer<typeof CreateUserSchema>;
}

@Injectable()
class CreateUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async execute({ data }: IRequest): Promise<User> {
    const userRecord = await this.userRepository.findOne({
      where: {
        email: data.email,
        enabled: true,
      },
    });

    if (userRecord) {
      throw new AppError({
        name: 'User Already Exists',
        errorCode: 'user_already_exists',
        statusCode: HttpStatus.CONFLICT,
      });
    }

    const user = await this.userRepository.save({
      ...data,
      password: await argon2.hash(data.password),
    });

    return {
      ...user,
    };
  }
}

export default CreateUserService;
