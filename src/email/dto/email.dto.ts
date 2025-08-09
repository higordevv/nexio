import { IsEmail, IsOptional, IsString } from "class-validator";

export class SendEmailDto {
  @IsEmail() to: string;
  @IsString() subject: string;
  @IsString() bodyHtml: string;
  @IsOptional() @IsString() idempotencyKey?: string; // importante
  @IsOptional() metadata?: Record<string, any>;
}