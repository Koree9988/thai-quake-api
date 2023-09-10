import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FaultlineModule } from './faultline/faultline.module';

@Module({
  imports: [FaultlineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
