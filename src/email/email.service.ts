import { Injectable } from '@nestjs/common';
import { EmailRepository } from './email-repository';
import { EmailDto } from './dto/email.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class EmailService implements EmailRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: EmailDto): Promise<void> {
    await this.prisma.email.create({ data });
  }
}
