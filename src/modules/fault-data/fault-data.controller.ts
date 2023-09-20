import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FaultDataService } from './fault-data.service';
// import { CreateFaultDatumDto } from './dto/create-fault-datum.dto';
// import { UpdateFaultDatumDto } from './dto/update-fault-datum.dto';

@Controller('fault-data')
export class FaultDataController {
  constructor(private readonly faultDataService: FaultDataService) {}

  // @Post()
  // create(@Body() createFaultDatumDto: CreateFaultDatumDto) {
  //   return this.faultDataService.create(createFaultDatumDto);
  // }

  @Get()
  findAll() {
    return this.faultDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faultDataService.findOne(+id);
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
}
