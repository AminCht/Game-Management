import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy, JwtStrategy } from './strategy';
@Module({
  imports: [JwtModule.register({signOptions: { expiresIn: '1h' }})],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,GoogleStrategy]
})
export class AuthModule {}
