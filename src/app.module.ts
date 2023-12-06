import { Module } from '@nestjs/common';
import { FaultlineModule } from './modules/faultline/faultline.module';
import { FaultDataModule } from './modules/fault-data/fault-data.module';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { DataSeparationModule } from './modules/data-separation/data-separation.module';
import { FaultGroupModule } from './modules/fault-group/fault-group.module';
import { UserModule } from './modules/user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'thaiquake@gmail.com',
          pass: 'wstq ifvx mimc mxks',
        },
      },
      defaults: {
        from: 'thaiquake@gmail.com',
      },
    }),
    FaultlineModule,
    FaultGroupModule,
    FaultDataModule,
    UserModule,
    CoreModule,
    DataSeparationModule,
  ],
})
export class AppModule {}

//google api key :AIzaSyCJg5GgotowJ4WAibfRqswsbnU6ED4Pb4k
