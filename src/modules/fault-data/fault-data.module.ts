import { Module } from '@nestjs/common';
import { FaultDataService } from './fault-data.service';
import { FaultDataController } from './fault-data.controller';
import { FaultDataRepository } from './fault-data.repository';

@Module({
  controllers: [FaultDataController],
  providers: [FaultDataService, FaultDataRepository],
  exports: [FaultDataService, FaultDataRepository],
})
export class FaultDataModule {}
