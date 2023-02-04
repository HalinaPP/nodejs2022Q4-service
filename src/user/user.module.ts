import { InMemoryUserStorage } from './store/user.storage';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserStorage',
      useClass: InMemoryUserStorage,
    },
  ],
  exports: [UserService],
})
export class UserModule { }
