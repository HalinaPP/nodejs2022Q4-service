import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, info, context) {
    const request = context.switchToHttp().getRequest();
    const { login, password } = request.body;

    if (err || !user) {
      if (!login || !password) {
        throw new BadRequestException();
      } else if (!password) {
        throw err || new UnauthorizedException();
      }
    }
    return user;
  }
}
