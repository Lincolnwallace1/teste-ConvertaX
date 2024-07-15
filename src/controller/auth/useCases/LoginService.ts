import { Injectable, HttpStatus } from '@nestjs/common';
import Z from 'zod';
import * as argon2 from 'argon2';
import AppError from '@common/erros/AppError';
import { JwtService } from '@nestjs/jwt';
import UserRepository from '@model/user/repositorie/UserRepositorie';

import { ILoginResponse } from '@views/auth/responses';

import { LoginSchema } from '@views/auth/schemas';

interface IRequest {
  data: Z.infer<typeof LoginSchema>;
}

@Injectable()
class LoginService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async execute({ data }: IRequest): Promise<ILoginResponse> {
    const user = await this.userRepository.get({
      email: data.email,
      enabled: true,
    });

    if (!user) {
      throw new AppError({
        name: 'User not found',
        errorCode: 'user_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    if (!(await argon2.verify(user.password, data.password))) {
      throw new AppError({
        name: 'Invalid password',
        errorCode: 'invalid_password',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    const accessToken = this.jwtService.sign({ id: user.id });
    const refreshToken = this.jwtService.sign({ id: user.id });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export default LoginService;
