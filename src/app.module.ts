import { Module } from '@nestjs/common';
import { FaultlineModule } from './modules/faultline/faultline.module';
import { FaultDataModule } from './modules/fault-data/fault-data.module';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { DataSeparationModule } from './modules/data-separation/data-separation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FaultlineModule,
    FaultDataModule,
    CoreModule,
    DataSeparationModule,
  ],
})
export class AppModule {}
