import { Injectable, HttpStatus } from '@nestjs/common';
import Z from 'zod';
import * as argon2 from 'argon2';
import AppError from '@common/erros/AppError';

import UserRepository from '@model/user/repositorie/UserRepositorie';

import { UpdateUserSchema } from '@views/user/schemas';

interface IRequest {
  id: number;
  data: Z.infer<typeof UpdateUserSchema>;
}

@Injectable()
class UpdateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute({ id, data }: IRequest): Promise<void> {
    const user = await this.userRepository.get({ id, enabled: true });

    if (!user) {
      throw new AppError({
        name: 'User Not Found',
        errorCode: 'user_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    // Verificação da senha antiga e atualização da nova senha
    if (data.password) {
      user.password = await argon2.hash(data.password);
    }

    user.fullname = data.fullname || user.fullname;
    user.email = data.email || user.email;

    await this.userRepository.update(user.id, {
      fullname: user.fullname,
      email: user.email,
      password: user.password,
    });
  }
}

export default UpdateUserService;
