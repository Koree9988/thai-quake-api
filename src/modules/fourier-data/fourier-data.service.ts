import { HttpException, Injectable, Logger } from '@nestjs/common';
import {
  createRawDataRequest,
  findAllFourierRequest,
} from './fourier-data.request';
import { PrismaService } from 'src/core/prisma.service';
import { FourierDataRepository } from './fourier-data.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class FourierDataService {
  private logger = new Logger(FourierDataService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly repository: FourierDataRepository,
  ) {}
  async create(data: createRawDataRequest) {
    return await this.prisma.rawData.create({
      data: { ...data, dateUtc: new Date(data.dateUtc) },
    });
  }
  async createMany(datas: Prisma.rawDataCreateManyInput[]) {
    return await this.prisma.rawData.createMany({
      data: datas,
      skipDuplicates: true,
    });
  }

  async countRecord() {
    return await this.prisma.rawData.count();
  }

  findOne(id: number) {
    return `This action returns a #${id} faultDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} faultDatum`;
  }

  async deleteMany(id: number) {
    try {
      return await this.prisma.rawData.deleteMany({
        where: {
          id: {
            gt: id,
          },
        },
      });
    } catch (error) {
      console.log('🚀  error:', error);
    }
  }
}
