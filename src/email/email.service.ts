import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { EmailRepository } from './email-repository';
import { EmailDto } from './dto/email.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Queue, RepeatOptions } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { MailerService } from '@nestjs-modules/mailer';
import { OnModuleInit } from '@nestjs/common';

@Injectable()
export class EmailService implements EmailRepository, OnModuleInit {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
    @InjectQueue('email-queue') private readonly queue: Queue,
  ) {}

  async onModuleInit() {
    await this.queue.add(
      'cleanup-emails',
      {},
      {
        repeat: { cron: '0 12,23 * * *' } as RepeatOptions,
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
  }
  async cleanUpEmails(): Promise<void> {
    try {
      await this.prisma.email.deleteMany({
        where: { status: 'sent' },
      });
      this.logger.log('Emails enviados foram limpos com sucesso.');
    } catch (error) {
      this.logger.error('Erro ao limpar emails enviados', error.stack);
      throw new InternalServerErrorException('Erro ao limpar emails enviados');
    }
  }
  markAsFailed(id: string, message: any) {
    try {
      this.prisma.email.updateMany({
        where: { id },
        data: { status: 'failed' },
      });
      this.logger.log(`Email marcado como falhado. ID: ${id}`);
    } catch (error) {
      this.logger.error(
        `Erro ao marcar email como falhado. ID: ${id}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Erro ao marcar email como falhado',
      );
    }
  }
  async sendEmail(data: EmailDto): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: data.to,
        subject: data.subject,
        text: data.subject,
        html: data.bodyHtml,
      });

      await this.prisma.email.updateMany({
        where: { id: data.id },
        data: { status: 'sent' },
      });

      this.logger.log(`Email enviado para: ${data.to}`);
    } catch (error) {
      this.logger.error(`Erro ao enviar email para ${data.to}`, error.stack);
      throw new InternalServerErrorException('Erro ao enviar email');
    }
  }

  async record(data: EmailDto): Promise<void> {
    try {
      await this.prisma.email.create({ data });
      await this.queue.add('send-email', data);
      this.logger.log(`Email adicionado à fila para: ${data.to}`);
    } catch (error) {
      this.logger.error(
        `Erro ao adicionar email à fila para ${data.to}`,
        error.stack,
      );
      throw new InternalServerErrorException('Erro ao registrar email na fila');
    }
  }
}
