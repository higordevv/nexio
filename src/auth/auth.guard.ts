import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { readFileSync } from 'fs';
import { resolve } from 'path';

interface JwtPayload {
  id: string;
  email: string;
}


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token ausente');
    }

    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        algorithms: ['RS256'],
        publicKey: readFileSync(
          resolve(process.env.AUTH_PATH_KEYS || 'keys', 'public.pem'),
          'utf8',
        ),
      });
      request['user'] = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
