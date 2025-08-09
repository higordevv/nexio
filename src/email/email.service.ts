import { Injectable } from '@nestjs/common';
import { EmailRepository } from './email-repository';
import { SendEmailDto } from './dto/email.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class EmailService implements EmailRepository {
  constructor(private prisma: PrismaService) {}

  async sendEmail(data: SendEmailDto): Promise<void> {
    await this.prisma.email.create({ data });
  }
}
