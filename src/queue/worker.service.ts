// src/queue/email.processor.ts
import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EmailService } from '../email/email.service';
import { Inject } from '@nestjs/common';
import { EmailDto } from 'src/email/dto/email.dto';

@Processor('email-queue')
export class EmailProcessor extends WorkerHost {
  constructor( @Inject('EmailRepository') private readonly emailService: EmailService,) {
    super();
  }

  // Processa 1 por vez (concurrency control)
  async process(job: Job<EmailDto>): Promise<any> {
    console.log(`📧 Processando email para: ${job.data.to}`);
    await this.emailService.sendEmail(job.data);
    return { status: 'enviado' };
  }

  // Webhook ao completar
  @OnWorkerEvent('completed')
  async onCompleted(job: Job, result: any) {
    console.log(`✅ Email enviado: ${job.data.to}`);
   
  }

  // Webhook ao falhar
  @OnWorkerEvent('failed')
  async onFailed(job: Job, err: any) {
    console.log(`❌ Falhou envio para: ${job.data.to}`, err);
    // Aqui também pode notificar
  }
}
