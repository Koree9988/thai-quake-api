import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { getPageInformation, getSort, getPagination } from 'src/base/internal';
import { PrismaService } from 'src/core/prisma.service';
import { findAllFourierRequest } from './fourier-data.request';

@Injectable()
export class FourierDataRepository {
  constructor(private readonly prisma: PrismaService) {}

  query(query: findAllFourierRequest) {
    const where: Prisma.rawDataWhereInput = {};
    if (query.faultId) where.faultId = query.faultId;
    return where;
  }

  async findAllByQuery(query: findAllFourierRequest) {
    const { limit, skip } = getPageInformation(query.limit, query.page);
    const order = getSort(query.sort, query.reverse);
    const where = this.query(query);

    const countStmt = this.prisma.fourierResult.count({ where });
    const queryStmt = this.prisma.fourierResult.findMany({
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
