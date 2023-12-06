import { Global, Module } from '@nestjs/common';
import { ContextService } from './context.service';
import { PrismaService } from './prisma.service';
import { UtilsService } from './utils.service';
import { EnvironmentConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    UtilsService,
    ContextService,
    PrismaService,
    JwtService,
    EnvironmentConfigService,
  ],
  exports: [
    UtilsService,
    ContextService,
    PrismaService,
    JwtService,
    EnvironmentConfigService,
  ],
})
export class CoreModule {}
