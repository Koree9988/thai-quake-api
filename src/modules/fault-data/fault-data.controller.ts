import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FaultDataService } from './fault-data.service';
import { faultEvents } from 'src/base/model';
import { ApiTags } from '@nestjs/swagger';
import { findAllFaultlineRequest } from './fault-data.request';
@ApiTags('Fault Event')
@Controller('fault-data')
export class FaultDataController {
  constructor(private readonly faultDataService: FaultDataService) {}

  // @Post()
  // create(@Body() createFaultDatumDto: CreateFaultDatumDto) {
  //   return this.faultDataService.create(createFaultDatumDto);
  // }

  @Post('record')
  createMany(@Body() createFaultDatumDto: faultEvents) {
    return this.faultDataService.storeData(createFaultDatumDto);
  }

  @Post('save')
  saveExcisting() {
    return this.faultDataService.storeExcistingData();
  }

  @Get('record')
  record() {
    return this.faultDataService.countRecord();
  }

  @Get()
  findAll(@Query() query: findAllFaultlineRequest) {
    return this.faultDataService.findAll(query);
  }

  @Get('lastweek')
  findLastWeek() {
    return this.faultDataService.getLastWeekData();
  }

  @Get('analyze')
  getOneFault(@Query('id') id: string, @Query('range') range: string) {
    return this.faultDataService.getForAnalyze(+id, +range);
  }

  @Get('summary')
  getOneFaultInfo(@Query('id') id: string, @Query('range') range: string) {
    return this.faultDataService.getSummaryOfFault(+id, +range);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faultDataService.getAllData(+id);
  }

  @Get(':id/:rangeVal')
  findById(@Param('id') id: string, @Param('rangeVal') rangeVal: string) {
    return this.faultDataService.findSeparationData(+id, +rangeVal);
  }
  @Get('event/:x/:y')
  findArea(@Param('x') x: string, @Param('y') y: string) {
    return this.faultDataService.classifyFaultEvent(+x, +y);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateFaultDatumDto: UpdateFaultDatumDto,
  // ) {
  //   return this.faultDataService.update(+id, updateFaultDatumDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faultDataService.remove(+id);
  }
  @Delete('all/:id')
  deleteMany(@Param('id') id: string) {
    return this.faultDataService.deleteMany(+id);
  }
}
