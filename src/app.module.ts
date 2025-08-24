import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { PrismaModule } from './database/prisma.module';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express'; // or FastifyAdapter

@Module({
  imports: [
    AuthModule,
    EmailModule,
    PrismaModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullBoardModule.forRoot({
      route: '/queues', 
      adapter: ExpressAdapter, 
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
