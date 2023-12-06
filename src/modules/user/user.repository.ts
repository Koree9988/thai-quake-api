import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { getPageInformation, getSort, getPagination } from 'src/base/internal';
import { PrismaService } from 'src/core/prisma.service';
import { UserFindAllRequest } from './user.request';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  query(query: UserFindAllRequest) {
    const where: Prisma.userWhereInput = {};

    if (query.role) where.role = query.role;

    if (query.query) {
      where.email = { contains: query.query, mode: 'insensitive' };
    }

    if (query.firebaseUid) where.firebaseUid = query.firebaseUid;

    if (query.displayName) {
      where.displayName = { contains: query.displayName, mode: 'insensitive' };
    }

    return where;
  }

  async findAllByQuery(query: UserFindAllRequest) {
    const { limit, skip } = getPageInformation(query.limit, query.page);
    const order = getSort(query.sort, query.reverse);
    const where = this.query(query);

    const countStmt = this.prisma.user.count({ where });
    const queryStmt = this.prisma.user.findMany({
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
