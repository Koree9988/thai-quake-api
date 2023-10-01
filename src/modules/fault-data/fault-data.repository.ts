import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { getPageInformation, getSort, getPagination } from 'src/base/internal';
import { PrismaService } from 'src/core/prisma.service';
import { findAllFaultlineRequest } from './fault-data.request';

@Injectable()
export class FaultDataRepository {
  constructor(private readonly prisma: PrismaService) {}

  query(query: findAllFaultlineRequest) {
    const where: Prisma.rawDataWhereInput = {};
    if (query.faultId) where.faultId = query.faultId;
    return where;
  }

  async findAllByQuery(query: findAllFaultlineRequest) {
    const { limit, skip } = getPageInformation(query.limit, query.page);
    const order = getSort(query.sort, query.reverse);
    const where = this.query(query);

    const countStmt = this.prisma.rawData.count({ where });
    const queryStmt = this.prisma.rawData.findMany({
      where: where,
      orderBy: order,
      take: limit,
      skip: skip,
      select: {
        dateUtc: true,
        magnitude: true,
        lat: true,
        long: true,
        centerEn: true,
      },
    });
    const [count, entities] = await Promise.all([countStmt, queryStmt]);
    const response = {
      pagination: getPagination(limit, query.page, count),
      entities: entities,
    };
    return response;
  }
}
