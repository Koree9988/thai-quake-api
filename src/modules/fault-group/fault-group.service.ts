import { Injectable, Logger } from '@nestjs/common';
import {
  CreateFaultGroupRequest,
  UpdateFaultGroupRequest,
  findAllFaultGroupRequest,
} from './fault-group.request';
import data from 'src/data/convex-hull-polygon.json';
import { PrismaService } from 'src/core/prisma.service';
import { FaultGroupRepository } from './fault-group.repository';

@Injectable()
export class FaultGroupService {
  private logger = new Logger(FaultGroupService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly repository: FaultGroupRepository,
  ) {}
  createInitial() {
    const faultName = [];
    data.forEach((element) => {
      faultName.push({ name: element.fName });
    });

    return this.prisma.faults.createMany({
      data: faultName,
      skipDuplicates: true,
    });
  }

  createNewGroup(createFaultGroupDto: CreateFaultGroupRequest) {
    return this.prisma.faults.create({
      data: { ...createFaultGroupDto },
    });
  }

  findAll(query: findAllFaultGroupRequest) {
    return this.repository.findAllFaultByQuery(query);
  }

  findOne(id: number) {
    return `This action returns a #${id} faultGroup`;
  }

  update(id: number, updateFaultGroupDto: UpdateFaultGroupRequest) {
    return `This action updates a #${id} faultGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} faultGroup`;
  }
}
