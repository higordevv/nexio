import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EmailDto {
  @IsNotEmpty() userId: string
  @IsEmail() to: string;
  @IsString() subject: string;
  @IsString() bodyHtml: string;
  @IsOptional() @IsString() idempotencyKey?: string; // importante
  @IsOptional() metadata?: Record<string, any>;
}