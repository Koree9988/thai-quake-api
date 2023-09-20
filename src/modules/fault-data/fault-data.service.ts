import { Injectable, Logger } from '@nestjs/common';
import data from 'src/data/faultPosition.json';
import { CreateFaultDataRequest } from './fault-data.request';
import { PrismaService } from 'src/core/prisma.service';
// import { FaultDataRepository } from './fault-data.repository';

@Injectable()
export class FaultDataService {
  private logger = new Logger(FaultDataService.name);
  constructor(
    private readonly prisma: PrismaService, // private readonly repository: FaultDataRepository,
  ) {}
  async create(createFaultDataDto: CreateFaultDataRequest) {
    const formatData = {
      ...createFaultDataDto,
      dateUtc: createFaultDataDto.dateUtc,
    };
    return await this.prisma.faultData.create({
      data: formatData,
    });
  }

  findAll() {
    return `This action returns all faultData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} faultDatum`;
  }

  // update(id: number, updateFaultDatumDto: UpdateFaultDatumDto) {
  //   return `This action updates a #${id} faultDatum`;
  // }

  remove(id: number) {
    return `This action removes a #${id} faultDatum`;
  }

  classifyFault(utm_x: number, utm_y: number) {
    try {
      const x = Number(utm_x);
      const y = Number(utm_y);
      for (let i = 0; i < data.length; i++) {
        const faultArea = data[i].FAULT_AREA;
        const polygonPoints = faultArea.map((point) => [point.X, point.Y]);
        let inside = false;
        for (
          let i = 0, j = polygonPoints.length - 1;
          i < polygonPoints.length;
          j = i++
        ) {
          const xi = polygonPoints[i][0];
          const yi = polygonPoints[i][1];
          const xj = polygonPoints[j][0];
          const yj = polygonPoints[j][1];
          const intersect =
            yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
          if (intersect) inside = !inside;
        }
        if (inside) {
          return Number(data[i].FAULT_ID);
        }
      }
      return null;
    } catch (error) {
      console.log('🚀  error:class', error);
    }
  }
}
