import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from './email.service';

@Module({
  controllers: [EmailController],
  imports: [PrismaModule, AuthModule],
  providers: [{ provide: 'EmailRepository', useClass: EmailService }, JwtService],
})
export class EmailModule {}
