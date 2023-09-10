import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FaultlineService } from './faultline.service';
import {
  findAllFaultlineRequest,
  CreateFaultlineRequest,
  UpdateFaultlineRequest,
} from './faultline.request';

@Controller('faultline')
export class FaultlineController {
  constructor(private readonly faultlineService: FaultlineService) {}

  @Post()
  create(@Body() createFaultlineDto: CreateFaultlineRequest) {
    return this.faultlineService.create(createFaultlineDto);
  }

  @Get()
  findAll() {
    return this.faultlineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faultlineService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFaultlineDto: UpdateFaultlineRequest,
  ) {
    return this.faultlineService.update(+id, updateFaultlineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faultlineService.remove(+id);
  }
}
