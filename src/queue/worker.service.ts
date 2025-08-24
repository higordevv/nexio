import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EmailService } from '../email/email.service';
import { Inject, Logger } from '@nestjs/common';
import { EmailDto } from 'src/email/dto/email.dto';

@Processor('email-queue')
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(
    @Inject('EmailRepository') private readonly emailService: EmailService,
  ) {
    super();
  }

  async process(job: Job<EmailDto>): Promise<any> {
    try {
      this.logger.log(`📨 Iniciando envio de e-mail para: ${job.data.to}`);
      await this.emailService.sendEmail(job.data);

      if (job.name === 'cleanup-emails') {
        this.logger.log('🧹 Executando cleanUpEmails (agendado)');
        await this.emailService.cleanUpEmails();
        return { status: 'limpeza concluída' };
      }

      return { status: 'enviado' };
    } catch (error) {
      this.logger.error(`❌ Erro no envio para: ${job.data?.to}`, error.stack);

      try {
        this.emailService.markAsFailed(job.data.id, error.message);
      } catch (dbError) {
        this.logger.error('Erro ao registrar falha no banco', dbError.stack);
      }

      throw error;
    }
  }

  @OnWorkerEvent('completed')
  async onCompleted(job: Job) {
    this.logger.log(`✅ Job concluído para: ${job.data.to}`);
    try {
      await this.emailService.cleanUpEmails();
    } catch (error) {
      this.logger.error('Erro ao limpar emails enviados', error.stack);
    }
  }

  @OnWorkerEvent('failed')
  async onFailed(job: Job, err: any) {
    this.logger.error(
      `❌ Job falhou para: ${job?.data?.to}`,
      err?.stack || err,
    );
  }
}
