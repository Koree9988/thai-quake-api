import { Controller, Get, Param, Query } from '@nestjs/common';
import { DataSeparationService } from './data-separation.service';
import { separationDataRequest } from './data-separation.request';
import { ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';

@Controller('data-separation')
@ApiTags('classify')
export class DataSeparationController {
  constructor(
    private readonly dataSeparationService: DataSeparationService,
    private readonly httpService: HttpService,
  ) {}

  @Get(':name/geometry')
  findGeometry(@Param('name') name: string) {
    return this.dataSeparationService.findAllInFaultGroup(name);
  }

  @Get('event')
  findOne(@Query() data: separationDataRequest) {
    return this.dataSeparationService.findFaultline(data);
  }
}
