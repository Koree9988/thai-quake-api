import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private readonly configSrv: ConfigService) {}
  private _config = {
    name: this.configSrv.get('NAME'),
    database: this.configSrv.get('DATABASE_URL'),
    port: this.configSrv.get('PORT'),
    mode: this.configSrv.get('MODE'),
  };
  get config() {
    return this._config;
  }
}
