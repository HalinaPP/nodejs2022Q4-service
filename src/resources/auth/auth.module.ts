import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { authConfig } from './../../config';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Auth } from './entities/auth.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([Auth]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: authConfig.JWT_SECRET_KEY,
      signOptions: { expiresIn: authConfig.TOKEN_EXPIRE_TIME },
    }),
  ],
  exports: [TypeOrmModule],
})
export class AuthModule { }
