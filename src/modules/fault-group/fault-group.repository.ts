import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { getPageInformation, getSort, getPagination } from 'src/base/internal';
import { PrismaService } from 'src/core/prisma.service';
import { findAllFaultGroupRequest } from './fault-group.request';

@Injectable()
export class FaultGroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  query(query: findAllFaultGroupRequest) {
    const where: Prisma.faultsWhereInput = {};
    if (query.faultName)
      where.name = { contains: query.faultName, mode: 'insensitive' };
    if (query.faultId) where.id = query.faultId;
    return where;
  }

  async findAllFaultByQuery(query: findAllFaultGroupRequest) {
    const { limit, skip } = getPageInformation(query.limit, query.page);
    const order = getSort(query.sort, query.reverse);
    const where = this.query(query);

    const countStmt = this.prisma.faults.count({ where });
    const queryStmt = this.prisma.faults.findMany({
      where: where,
      orderBy: order,
      take: limit,
      skip: skip,
      select: {
        id: true,
        name: true,
      },
    });
    const [count, entities] = await Promise.all([countStmt, queryStmt]);
    const response = {
      pagination: getPagination(limit, query.page, count),
      entities: entities,
    };
    return response;
  }
  async findAllDataByQuery(query: findAllFaultGroupRequest) {
    const { limit, skip } = getPageInformation(query.limit, query.page);
    const order = getSort(query.sort, query.reverse);
    const where = this.query(query);

    const countStmt = this.prisma.rawData.count({ where });
    const queryStmt = this.prisma.rawData.findMany({
      where: where,
      orderBy: order,
      take: limit,
      skip: skip,
    });
    const [count, entities] = await Promise.all([countStmt, queryStmt]);
    const response = {
      pagination: getPagination(limit, query.page, count),
      entities: entities,
    };
    return response;
  }
}
