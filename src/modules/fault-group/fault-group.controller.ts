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
import { FaultGroupService } from './fault-group.service';
import {
  CreateFaultGroupRequest,
  UpdateFaultGroupRequest,
  findAllFaultGroupRequest,
} from './fault-group.request';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Fault Group')
@Controller('fault-group')
export class FaultGroupController {
  constructor(private readonly faultGroupService: FaultGroupService) {}

  @Post('/initial')
  createInitial() {
    return this.faultGroupService.createInitial();
  }

  @Post()
  create(@Body() createFaultGroupDto: CreateFaultGroupRequest) {
    return this.faultGroupService.createNewGroup(createFaultGroupDto);
  }

  @Get()
  findAll(@Query() query: findAllFaultGroupRequest) {
    return this.faultGroupService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faultGroupService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFaultGroupDto: UpdateFaultGroupRequest,
  ) {
    return this.faultGroupService.update(+id, updateFaultGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faultGroupService.remove(+id);
  }
}
