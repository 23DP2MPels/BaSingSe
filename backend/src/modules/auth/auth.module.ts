import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { SessionGuard } from './guards/session.guard';

@Global()
@Module({
  imports: [UserModule],
  providers: [AuthService, SessionGuard],
  controllers: [AuthController],
  exports: [SessionGuard],
})
export class AuthModule {}
