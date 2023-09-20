import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FaultlineService } from './faultline.service';
import {
  findAllFaultlineRequest,
  // CreateFaultlineRequest,
  UpdateFaultlineRequest,
  // CreateFaultAreaRequest,
} from '../fault-data/fault-data.request';
import { ApiTags } from '@nestjs/swagger';

@Controller('faultline')
@ApiTags('Faultline')
export class FaultlineController {
  constructor(private readonly faultlineService: FaultlineService) {}

  // @Post()
  // create(@Body() createFaultlineDto: CreateFaultlineRequest) {
  //   return this.faultlineService.create(createFaultlineDto);
  // }

  // @Post()
  // createArea(
  //   @Param('id') id: string,
  //   @Body() createFaultArea: CreateFaultAreaRequest,
  // ) {
  //   return this.faultlineService.createArea(+id, createFaultArea);
  // }

  @Get()
  findAll(@Query() query: findAllFaultlineRequest) {
    this.faultlineService.getClassForPoint(1, 2);
    return this.faultlineService.findAll(query);
  }

  // @Get('test')
  // async setArea() {
  //   return await this.faultlineService.allCreate();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faultlineService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateFaultlineDto: UpdateFaultlineRequest,
  // ) {
  //   return this.faultlineService.update(+id, updateFaultlineDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faultlineService.remove(+id);
  }
}
