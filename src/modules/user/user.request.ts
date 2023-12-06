import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsString, IsEnum, IsEmail, IsOptional } from 'class-validator';
import { GetAllDto } from 'src/base/request';

export class UserFindAllRequest extends GetAllDto {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  displayName?: string;

  @ApiProperty({ type: String, required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  firebaseUid?: string;

  @ApiProperty({ type: String, required: false })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
export class UserCreateRequest {
  @ApiProperty({ type: String, required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  displayName?: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  firebaseUid?: string;

  @ApiProperty({ type: String, required: true })
  @IsEnum(Role)
  role: Role;
}

export class UserUpdateRequest {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  userName?: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  displayName?: string;
}
