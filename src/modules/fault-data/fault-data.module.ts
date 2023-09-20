import { Module } from '@nestjs/common';
import { FaultDataService } from './fault-data.service';
import { FaultDataController } from './fault-data.controller';
// import { FaultDataRepository } from './fault-data.repository';

@Module({
  controllers: [FaultDataController],
  providers: [FaultDataService],
  exports: [FaultDataService],
})
export class FaultDataModule {}
