import { EmailDto } from './dto/email.dto';

export abstract class EmailRepository {
  abstract record(data: EmailDto): Promise<void>;
  abstract sendEmail(data: EmailDto): Promise<void>;
}

