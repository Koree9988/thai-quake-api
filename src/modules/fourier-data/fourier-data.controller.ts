// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Delete,
//   Query,
// } from '@nestjs/common';
// import { FourierDataService } from './fourier-data.service';
// import { faultEvents } from 'src/base/model';
// import { ApiTags } from '@nestjs/swagger';
// import { findAllFourierRequest } from './fourier-data.request';
// @ApiTags('Fault Event')
// @Controller('fault-data')
// export class FourierDataController {
//   constructor(private readonly fourierDataService: FourierDataService) {}

//   @Get('record')
//   record() {
//     return this.fourierDataService.countRecord();
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.fourierDataService.remove(+id);
//   }
//   @Delete('all/:id')
//   deleteMany(@Param('id') id: string) {
//     return this.fourierDataService.deleteMany(+id);
//   }
// }
