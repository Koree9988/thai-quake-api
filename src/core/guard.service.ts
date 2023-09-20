// import {
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   Injectable,
//   SetMetadata,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';
// import { UserService } from 'src/modules/user/user.service';
// import { ContextService } from './context.service';
// import { Reflector } from '@nestjs/core';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private readonly jwtSrv: JwtService,
//     private readonly context: ContextService,
//     private readonly userSrv: UserService,
//     private readonly reflector: Reflector,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const roles = this.reflector.get<string[]>('roles', context.getHandler());
//     const request = context.switchToHttp().getRequest();

//     const token = this.extractTokenFromHeader(request);

//     if (!token) throw new UnauthorizedException();

//     const decode = (await this.jwtSrv.decode(token)) as any;

//     if (!decode) throw new UnauthorizedException();

//     const user = await this.userSrv.findUser(decode.id);

//     if (!user || user.deletedAt) throw new UnauthorizedException();

//     if (roles && !roles.includes(user.role)) throw new ForbiddenException();

//     this.context.user = user;

//     return true;
//   }

//   private extractTokenFromHeader(request: Request): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
// }

// export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
