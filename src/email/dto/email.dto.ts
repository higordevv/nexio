import { IsEmail, IsOptional, IsString } from "class-validator";

export class EmailDto {
  @IsString() userId: string
  @IsEmail() to: string;
  @IsString() subject: string;
  @IsString() bodyHtml: string;
  @IsOptional() @IsString() idempotencyKey?: string; // importante
  @IsOptional() metadata?: Record<string, any>;
}