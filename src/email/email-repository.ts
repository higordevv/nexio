import { EmailDto } from './dto/email.dto';

export abstract class EmailRepository {
  abstract create(data: EmailDto): Promise<void>;
}
