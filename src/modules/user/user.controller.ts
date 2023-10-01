import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Scope,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserCreateRequest,
  UserFindAllRequest,
  UserUpdateRequest,
} from './user.request';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard, Roles } from 'src/core/guard.service';
import { Role } from '@prisma/client';

@ApiTags('Users')
@Controller({ path: 'user', scope: Scope.REQUEST })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: UserCreateRequest) {
    return this.userService.create(data);
  }

  @ApiSecurity('APIKeys')
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() query: UserFindAllRequest) {
    return await this.userService.findAll(query);
  }

  @ApiSecurity('APIKeys')
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @ApiSecurity('APIKeys')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() payload: UserUpdateRequest) {
    return this.userService.update(id, payload);
  }

  @ApiSecurity('APIKeys')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.removeAccount(id);
  }
}
