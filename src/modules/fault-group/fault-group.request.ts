import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { GetAllDto } from 'src/base/request';

export class findAllFaultGroupRequest extends GetAllDto {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  faultName?: string;

  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @IsOptional()
  faultId?: number;
}

// export class CreateFaultlineRequest {}

export class CreateFaultGroupRequest {
  @ApiProperty({ type: String, required: true })
  @IsString()
  faultName: string;

  //   @ApiProperty({ type: String, required: true })
  //   @IsString()
  //   lats: string;

  //   @ApiProperty({ type: String, required: true })
  //   @IsString()
  //   longs: string;

  //   @ApiProperty({ type: String, required: true })
  //   @IsString()
  //   utmsX: string;

  //   @ApiProperty({ type: String, required: true })
  //   @IsString()
  //   utmsY: string;
}

export class UpdateFaultGroupRequest {
  @ApiProperty({ type: String, required: true })
  @IsString()
  faultName: string;
}
