import { SendEmailDto } from './dto/email.dto';

export abstract class EmailRepository {
  abstract sendEmail(data: SendEmailDto): Promise<void>;
}
