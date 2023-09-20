import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class separationDataRequest {
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  latitude: number;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  longitude: number;
}
