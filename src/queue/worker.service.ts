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

  async process(job: Job<EmailDto>): Promise<any> {
    await this.emailService.sendEmail(job.data);
    return { status: 'enviado' };
  }

  @OnWorkerEvent('completed')
  async onCompleted() {
      await this.emailService.cleanUpEmails();    
  }

  @OnWorkerEvent('failed')
  async onFailed(job: Job, err: any) {
    console.log(`❌ Falhou envio para: ${job.data.to}`, err);
  }
}
