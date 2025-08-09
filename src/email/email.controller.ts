import { Controller, Inject, Post } from '@nestjs/common';
import { EmailRepository } from './email-repository';
import { EmailDto } from './dto/email.dto';

@Controller('email')
export class EmailController {
  constructor(
    @Inject('EmailRepository') private readonly email_repo: EmailRepository,
  ) {}
  @Post('send')
  async sendEmail(data: EmailDto): Promise<void> {
    await this.email_repo.record(data);
  }
}
