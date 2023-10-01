import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { GetAllDto } from 'src/base/request';

export class findAllFaultlineRequest extends GetAllDto {
  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @IsOptional()
  faultId?: number;
}

export class CreateFaultDataRequest {
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  magnitude: number;

  @ApiProperty({ type: Date, required: true })
  @IsString()
  dateUtc: string;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  faultId: number;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  rawDataId: number;
}

export class UpdateFaultlineRequest {}

// export class CreateFaultData

export class createRawDataRequest {
  @ApiProperty({ type: Date, required: true })
  @IsNumber()
  dateUtc: Date;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  magnitude: number;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  lat: number;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  long: number;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  utmX: number;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  utmY: number;

  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  depth?: number;

  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  phase?: number;

  @ApiProperty({ type: String, required: false })
  @IsNumber()
  centerTh?: string;

  @ApiProperty({ type: String, required: false })
  @IsNumber()
  centerEn?: string;

  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  severityLevel?: number;

  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  faultId?: number;
}
