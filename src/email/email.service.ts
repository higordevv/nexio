import { Injectable } from '@nestjs/common';
import { EmailRepository } from './email-repository';
import { EmailDto } from './dto/email.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class EmailService implements EmailRepository {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('emailQueue') private queue: Queue,
  ) {}

  async record(data: EmailDto): Promise<void> {
    await this.prisma.email.create({ data });
    const job = await this.queue.add('send-email', data, {
      attempts: 5,
      backoff: { type: 'exponential', delay: 1000 },
    });
    console.log(`Job ${job.id} enfileirado com dados:`, data);
  }
}
