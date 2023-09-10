import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { GetAllDto } from 'src/base/request';

export class findAllFaultlineRequest extends GetAllDto {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  faultName?: string;

  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @IsOptional()
  faultId?: number;
}

export class CreateFaultlineRequest {}

export class UpdateFaultlineRequest {}
