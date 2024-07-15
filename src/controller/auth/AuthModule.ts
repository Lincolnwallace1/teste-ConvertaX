import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import Config from '@/config';

import { LocalStrategy } from '@common/infra/http/middlewares/AuthMiddleware/strategies/LocalStrategy';
import { JwtStrategy } from '@common/infra/http/middlewares/AuthMiddleware/strategies/JwtStrategy';

import { UserModule } from '@controller/user/UserModule';
import { LoginService } from '@controller/auth/useCases';

import AuthController from '@controller/auth/AuthController';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: Config.security.accessTokenSecret,
      signOptions: { expiresIn: Config.security.accessTokenExp },
    }),
  ],
  controllers: [AuthController],
  providers: [LoginService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
