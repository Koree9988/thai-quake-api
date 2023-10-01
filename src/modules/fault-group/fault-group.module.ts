import { Module } from '@nestjs/common';
import { FaultGroupService } from './fault-group.service';
import { FaultGroupController } from './fault-group.controller';
import { FaultGroupRepository } from './fault-group.repository';

@Module({
  imports: [],
  controllers: [FaultGroupController],
  providers: [FaultGroupService, FaultGroupRepository],
  exports: [FaultGroupService, FaultGroupRepository],
})
export class FaultGroupModule {}
