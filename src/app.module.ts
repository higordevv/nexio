import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [AuthModule, EmailModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
