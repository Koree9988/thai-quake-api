import { Global, Module } from '@nestjs/common';
import { ContextService } from './context.service';
import { PrismaService } from './prisma.service';
import { UtilsService } from './utils.service';
import { EnvironmentConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailsService } from './mail.service';
import { UserModule } from 'src/modules/user/user.module';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    UtilsService,
    ContextService,
    PrismaService,
    JwtService,
    MailsService,
    EnvironmentConfigService,
  ],
  exports: [
    UtilsService,
    ContextService,
    PrismaService,
    JwtService,
    MailsService,
    EnvironmentConfigService,
  ],
})
export class CoreModule {}
