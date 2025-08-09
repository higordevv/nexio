import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { EmailRepository } from './email-repository';
import { EmailDto } from './dto/email.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt';

@Controller('email')
export class EmailController {
  constructor(
    @Inject('EmailRepository') private readonly email_repo: EmailRepository,
  ) {}

  @UseGuards(AuthGuard)
  @Post('send')
  async sendEmail(
    @Body() data: EmailDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<void> {
    const recordedData: EmailDto = { ...data, userId: user.id, to: user.email };
    await this.email_repo.record(recordedData);
  }
}
