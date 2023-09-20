// import { Injectable } from '@nestjs/common';
// import { Prisma } from '@prisma/client';
// import { getPageInformation, getSort, getPagination } from 'src/base/internal';
// import { PrismaService } from 'src/core/prisma.service';
// import { findAllFaultlineRequest } from './fault-data.request';

// @Injectable()
// export class FaultDataRepository {
//   constructor(private readonly prisma: PrismaService) {}

//   query(query: findAllFaultlineRequest) {
//     const where: Prisma.faultDataWhereInput = {};
//     // if (query.magnitute) where.magnitude = query.magnitude;
//     // if (query.dateUtc) where.dateUtc = query.dateUtc;
//     // if (query.faultId) where.faultId = query.faultId;
//     // if (query.faults) where.faults = query.faults;
//     return where;
//   }

//   async findAllByQuery(query: findAllFaultlineRequest) {
//     const { limit, skip } = getPageInformation(query.limit, query.page);
//     const order = getSort(query.sort, query.reverse);
//     const where = this.query(query);

//     const countStmt = this.prisma.faultData.count({ where });
//     const queryStmt = this.prisma.faultData.findMany({
//       where: where,
//       orderBy: order,
//       take: limit,
//       skip: skip,
//       // include: {
//       //   vehicle: true,
//       // },
//     });
//     const [count, entities] = await Promise.all([countStmt, queryStmt]);
//     const response = {
//       pagination: getPagination(limit, query.page, count),
//       entities: entities,
//     };
//     return response;
//   }
// }
