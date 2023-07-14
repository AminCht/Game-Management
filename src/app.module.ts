import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal:true
  }),
  UserModule, GameModule, AuthModule, PrismaModule, ProfileModule],
})
export class AppModule {}
