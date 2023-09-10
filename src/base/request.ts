import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';

export class PaginationRequest {
  limit?: number;
  page?: number;
  sort?: string;
  reverse?: boolean;
  pagination?: boolean;
}

export class GetAllDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ obj, key }) => (obj[key] = Number(obj[key])))
  @ApiProperty({ type: Number, required: false })
  limit?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ obj, key }) => (obj[key] = Number(obj[key])))
  @ApiProperty({ type: Number, required: false })
  page?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  sort?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ obj, key }) => (obj[key] = obj[key] === 'true'))
  @ApiProperty({ type: Boolean, required: false })
  reverse?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  query?: string;
}
