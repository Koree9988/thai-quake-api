import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private readonly configSrv: ConfigService) {}
  private _config = {
    database: this.configSrv.get('DATABASE_URL'),
    port: this.configSrv.get('PORT'),
  };
  get config() {
    return this._config;
  }
}
