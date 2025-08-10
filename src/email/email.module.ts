import { Global, Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from './email.service';
import { BullModule } from '@nestjs/bullmq';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailProcessor } from '../queue/worker.service';
@Module({
  controllers: [EmailController],
  imports: [
    PrismaModule,
    
    AuthModule,
    BullModule.registerQueue({
      name: 'email-queue',
      defaultJobOptions: {
        attempts: 5,
        backoff: { type: 'exponential', delay: 1000 },
        removeOnComplete: true, // Remove automaticamente jobs concluídos da fila
      },
    }),
     MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.GOOGLE_APP_EMAIL, // exemplo: 'seuemail@gmail.com'
          pass: process.env.GOOGLE_APP_PASSWORD, // app password do Gmail
        },
      },
      defaults: {
        from: `"No Reply" <${process.env.GOOGLE_APP_EMAIL}>`,
      },
    })
  ],
  providers: [
    { provide: 'EmailRepository', useClass: EmailService },
    JwtService,
    EmailProcessor,
  ],
})
export class EmailModule {}
