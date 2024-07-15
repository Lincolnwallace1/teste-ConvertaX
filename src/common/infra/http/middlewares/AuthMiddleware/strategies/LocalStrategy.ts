import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginService } from '@controller/auth/useCases';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginService: LoginService) {
    super({
      usernameField: 'email',
    });
  }

  public async validate(email: string, password: string) {
    const user = await this.loginService.execute({
      data: { email, password },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
