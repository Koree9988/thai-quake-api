import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma.service';
import {
  UserCreateRequest,
  UserFindAllRequest,
  UserUpdateRequest,
} from './user.request';
import { Role } from '@prisma/client';
// import { UtilsService } from 'src/core/utils.service';
import { ContextService } from 'src/core/context.service';
import { UserRepository } from './user.repository';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    // private readonly utilsSrv: UtilsService,
    private readonly contextSrv: ContextService,
    private readonly prisma: PrismaService,
    private readonly repository: UserRepository,
  ) {}

  async create(payload: UserCreateRequest) {
    try {
      payload.userName = payload.userName || payload.email;
      payload.displayName = payload.displayName || payload.phoneNumber;

      // payload.password = await this.utilsSrv.encryptPassword(payload.password);

      const findUser = await this.prisma.user.findFirst({
        where: {
          OR: [{ phoneNumber: payload.phoneNumber }, { email: payload.email }],
        },
        select: {
          phoneNumber: true,
          email: true,
        },
      });

      if (findUser) {
        const msg = 'user already exists';
        console.log(findUser);

        this.logger.error(msg);
        throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
      }

      const user = await this.prisma.user.create({
        data: {
          ...payload,
          userName: payload.userName,
          displayName: payload.displayName,
          role: Role.GUESS_USER,
        },
      });
      return user;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(query: UserFindAllRequest) {
    try {
      return await this.repository.findAllByQuery(query);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, error.status);
    }
  }

  async findUser(id: number) {
    try {
      const userId = Number(id);
      return await this.prisma.user.findUnique({
        where: { id: userId },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.findUser(id);

      //check user exist and not deleted
      if (!user || user.deletedAt) {
        const msg = 'user not found';
        this.logger.error(msg);
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updateData: UserUpdateRequest) {
    try {
      const userAuth = this.contextSrv.user;
      /// check role
      if (userAuth.role !== Role.ADMIN && userAuth.id !== Number(id)) {
        throw new UnauthorizedException();
      }

      const user = await this.findOne(id);

      Object.assign(user, updateData);

      await this.prisma.user.update({
        where: { id: user.id },
        data: user,
      });
      return new HttpException('success', HttpStatus.OK);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, error.status);
    }
  }

  async removeAccount(id: number) {
    try {
      const userId = Number(id);
      const userAuth = this.contextSrv.user;
      if (userAuth.role !== Role.ADMIN && userAuth.id !== userId) {
        throw new UnauthorizedException();
      }
      const user = await this.findOne(id);

      await this.prisma.user.delete({
        where: { id: user.id },
      });
      return new HttpException('success', HttpStatus.OK);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, error.status);
    }
  }
}
