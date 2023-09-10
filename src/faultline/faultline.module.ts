import { Module } from '@nestjs/common';
import { FaultlineService } from './faultline.service';
import { FaultlineController } from './faultline.controller';

@Module({
  controllers: [FaultlineController],
  providers: [FaultlineService],
})
export class FaultlineModule {}
