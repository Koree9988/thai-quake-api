import { Injectable } from '@nestjs/common';
import { EnvironmentConfigService } from './core/config.service';
@Injectable()
export class AppService {
  constructor(private readonly configSrv: EnvironmentConfigService) {}
  private config = this.configSrv.config;

  // getHello(): string {
  //   return this.config.database;
  // }
}
