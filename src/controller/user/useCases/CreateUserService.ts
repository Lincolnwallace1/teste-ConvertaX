import { Injectable, HttpStatus } from '@nestjs/common';
import Z from 'zod';
import * as argon2 from 'argon2';
import AppError from '@common/erros/AppError';

import UserRepository from '@model/user/repositorie/UserRepositorie';

import User from '@entities/User';

import { CreateUserSchema } from '@views/user/schemas';

interface IRequest {
  data: Z.infer<typeof CreateUserSchema>;
}

@Injectable()
class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute({ data }: IRequest): Promise<User> {
    const userRecord = await this.userRepository.get({
      email: data.email,
      enabled: true,
    });

    if (userRecord) {
      throw new AppError({
        name: 'User Already Exists',
        errorCode: 'user_already_exists',
        statusCode: HttpStatus.CONFLICT,
      });
    }

    const user = await this.userRepository.create({
      fullname: data.fullname,
      email: data.email,
      password: await argon2.hash(data.password),
    });

    return {
      ...user,
    };
  }
}

export default CreateUserService;
