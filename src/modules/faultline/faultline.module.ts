import { Module } from '@nestjs/common';
import { FaultlineService } from './faultline.service';
import { FaultlineController } from './faultline.controller';
import { FaultlineRepository } from './faultline.repository';

@Module({
  imports: [],
  controllers: [FaultlineController],
  providers: [FaultlineService, FaultlineRepository],
  exports: [FaultlineService, FaultlineRepository],
})
export class FaultlineModule {}
