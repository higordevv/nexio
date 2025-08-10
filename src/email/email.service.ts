import { Injectable } from '@nestjs/common';
import { EmailRepository } from './email-repository';
import { EmailDto } from './dto/email.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService implements EmailRepository {
  constructor(
    private prisma: PrismaService,
    private readonly mailerService: MailerService,
    @InjectQueue('email-queue') private queue: Queue,
  ) {}
  async sendEmail(data: EmailDto): Promise<void> {
    await this.mailerService.sendMail({
      to: data.to,
      subject: data.subject,
      text: data.subject,
      html: data.bodyHtml,
    });
    console.log(`Email enviado para: ${data.to}`);
  }

  async record(data: EmailDto): Promise<void> {
    await this.prisma.email.create({ data });
    const job = await this.queue.add('send-email', data);
    console.log(`Job ${job.id} enfileirado com dados:`, data);
  }
}
