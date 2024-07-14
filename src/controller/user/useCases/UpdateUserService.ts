import { Injectable, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Z from 'zod';
import * as argon2 from 'argon2';
import AppError from '@common/erros/AppError';

import User from '@entities/User';

import { UpdateUserSchema } from '@views/user/schemas';

interface IRequest {
  id: number;
  data: Z.infer<typeof UpdateUserSchema>;
}

@Injectable()
class UpdateUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async execute({ id, data }: IRequest): Promise<void> {
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

    // Verificação da senha antiga e atualização da nova senha
    if (data.password) {
      const passwordMatch = await argon2.verify(
        user.password,
        data.password.old,
      );

      if (!passwordMatch) {
        throw new AppError({
          name: 'Invalid Password',
          errorCode: 'invalid_password',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      user.password = await argon2.hash(data.password.new);
    }

    user.fullname = data.fullname || user.fullname;
    user.email = data.email || user.email;

    await this.userRepository.save(user);
  }
}

export default UpdateUserService;
