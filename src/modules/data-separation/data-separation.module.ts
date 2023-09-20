import { Module } from '@nestjs/common';
import { DataSeparationService } from './data-separation.service';
import { DataSeparationController } from './data-separation.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [DataSeparationController],
  providers: [DataSeparationService],
  exports: [DataSeparationService],
})
export class DataSeparationModule {}
