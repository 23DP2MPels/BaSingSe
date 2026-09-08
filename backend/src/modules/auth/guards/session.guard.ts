import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log(request.session);
    if (!request.session?.userId) {
      throw new UnauthorizedException('You unauthorized');
    }
    request.userId = request.session.userId;
    return true;
  }
}
