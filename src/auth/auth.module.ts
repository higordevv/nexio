import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { AuthGuard } from './auth.guard';

@Module({
  controllers: [],
  providers: [AuthGuard],
  exports: [AuthGuard],
  imports: [
    JwtModule.register({
      publicKey: readFileSync(
        resolve(process.env.KEY_PATH || 'keys', 'public.pem'),
        'utf8',
      ),
      signOptions: {
        algorithm: 'RS256',
        expiresIn: '1h',
      },
    }),
  ],
})
export class AuthModule {}
