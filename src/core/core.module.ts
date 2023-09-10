import { Global, Module } from '@nestjs/common';
import { ContextService } from './context.service';
import { PrismaService } from './prisma.service';
import { UtilsService } from './utils.service';
import { SSHTunnelService } from './sshtunnel.service';
import { EnvironmentConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    UtilsService,
    ContextService,
    PrismaService,
    SSHTunnelService,
    EnvironmentConfigService,
  ],
  exports: [
    UtilsService,
    ContextService,
    PrismaService,
    SSHTunnelService,
    EnvironmentConfigService,
  ],
})
export class CoreModule {}
