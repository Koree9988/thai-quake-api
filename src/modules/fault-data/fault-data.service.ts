import { HttpException, Injectable, Logger } from '@nestjs/common';
import data from 'src/data/faultPosition.json';
import {
  createRawDataRequest,
  findAllFaultlineRequest,
} from './fault-data.request';
import { PrismaService } from 'src/core/prisma.service';
import { faultEvents, YearRange, Point, Polygon } from 'src/base/model';
import dayjs from 'dayjs';
import { FaultDataRepository } from './fault-data.repository';
import FaultLineConvex from 'src/data/convex-hull-data.json';
import { Prisma } from '@prisma/client';
import excistingData from 'src/data/data.json';
// import { Record } from 'src/base/model';

@Injectable()
export class FaultDataService {
  private logger = new Logger(FaultDataService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly repository: FaultDataRepository,
  ) {}
  // async create(createFaultDataDto: CreateFaultDataRequest) {
  //   const formatData = {
  //     ...createFaultDataDto,
  //     dateUtc: new Date(createFaultDataDto.dateUtc),
  //   };
  //   return await this.prisma.rawData.create({
  //     data: formatData,
  //   });
  // }
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
  async storeExcistingData() {
    try {
      const rawData: Prisma.rawDataCreateManyInput[] = [];
      await excistingData.map(async (element) => {
        const createData: Prisma.rawDataCreateManyInput = {
          ...element,
          dateUtc: new Date(element.dateUtc),
          faultId: null,
        };
        const inside = await this.classifyFaultEvent(
          element.utmX,
          element.utmY,
        );
        if (!inside.inside) {
          return rawData.push(createData);
        } else {
          const data: Prisma.rawDataCreateManyInput = {
            ...createData,
            faultId: Number(inside.fId),
          };
          return rawData.push(data);
        }
      });

      // Define the chunk size
      const chunkSize = 200;

      // Calculate the number of chunks
      const chunks = Math.ceil(rawData.length / chunkSize);

      for (let i = 0; i < chunks; i++) {
        // Get the next chunk of data
        const start = i * chunkSize;
        const end = start + chunkSize;
        const chunk = rawData.slice(start, end);

        // Use createMany to insert the chunk of records
        const result = await this.createMany(chunk);

        console.log(`Inserted ${result.count} records in chunk ${i + 1}`);
      }
      return 'Done';
    } catch (error) {
      console.log('🚀  error:', error);
    }
  }

  async storeData(datas: faultEvents) {
    const rawData: Prisma.rawDataCreateManyInput[] = [];
    await datas.map(async (element) => {
      const createData: Prisma.rawDataCreateManyInput = {
        ...element,
        dateUtc: new Date(element.dateUtc),
        faultId: null,
      };
      const inside = await this.classifyFaultEvent(element.utmX, element.utmY);
      if (!inside.inside) {
        return rawData.push(createData);
      } else {
        const data: Prisma.rawDataCreateManyInput = {
          ...createData,
          faultId: Number(inside.fId),
        };
        return rawData.push(data);
      }
    });
    return this.createMany(rawData);

    // await datas.forEach(async (element) => {
    //   const createData: createRawDataRequest = {
    //     ...element,
    //     faultId: null,
    //   };
    //   const inside = await this.classifyFaultEvent(element.utmX, element.utmY);
    //   if (!inside.inside) {
    //     return await this.create(createData);
    //   } else {
    //     const data = {
    //       ...createData,
    //       faultId: Number(inside.fId),
    //     };
    //     return await this.create(data);
    //   }
    // });
    return;
  }

  async countRecord() {
    return await this.prisma.rawData.count();
  }
  async getLastWeekData() {
    try {
      const sevenDaysAgo = dayjs().subtract(7, 'day').toDate();
      return await this.prisma.rawData.findMany({
        where: {
          dateUtc: {
            gte: sevenDaysAgo,
          },
        },
        select: {
          dateUtc: true,
          magnitude: true,
          lat: true,
          long: true,
          centerEn: true,
        },
        orderBy: {
          dateUtc: 'desc',
        },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(query: findAllFaultlineRequest) {
    try {
      return await this.repository.findAllByQuery(query);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, error.status);
    }
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

  // async SortData(records: Record[]) {
  //   try {
  //     const toDateString = (date: Date) => date.toISOString().split('T')[0];
  //     return records.sort((a, b) => {
  //       const dateA = toDateString(a.dateUtc);
  //       const dateB = toDateString(b.dateUtc);
  //       if (dateA === dateB) return b.magnitude - a.magnitude; // Highest magnitude first if dates are equal
  //       return a.dateUtc.getTime() - b.dateUtc.getTime(); // Earliest date first
  //     });
  //   } catch (error) {
  //     console.log('🚀  error:', error);
  //   }
  // }

  async getAllData(id: number) {
    try {
      const startYear = 2007;
      const dateOld = dayjs().year(startYear).startOf('year');
      const start = dateOld.format('YYYY-MM-DD');
      const endFormatted = dayjs().format('YYYY-MM-DD');
      const data = await this.findByRange(id, { start, end: endFormatted });
      return data;
    } catch (error) {
      console.log('🚀  error:', error);
    }
  }

  async getForAnalyze(id: number, range: number) {
    try {
      const startYear = 2007;
      const dateOld = dayjs().year(startYear).startOf('year');
      const start = dateOld.format('YYYY-MM-DD');
      const now = dayjs();
      const dayDiff = Number(now.diff(dateOld, 'year'));
      const numRange = Math.ceil(dayDiff / range);
      const dataAll = [];
      let current = dateOld;
      for (let index = 0; index < numRange; index++) {
        if (index == 0) {
          const temp = dateOld.add(range, 'year');
          const valRange = { start, end: temp.format('YYYY-MM-DD') };
          console.log('🚀  valRange:', valRange);
          const data = await this.findByRanges(id, valRange);
          current = temp;
          dataAll.push(data);
        } else {
          const temp = current.add(range, 'year');
          const valRange = {
            start: current.format('YYYY-MM-DD'),
            end: temp.format('YYYY-MM-DD'),
          };
          console.log('🚀  valRange:', valRange);
          const data = await this.findByRanges(id, valRange);
          current = temp;
          dataAll.push(data);
        }
      }
      // const endFormatted = dayjs().format('YYYY-MM-DD');
      // const data = await this.findByRanges(id, { start, end: endFormatted });
      return dataAll;
    } catch (error) {
      console.log('🚀  error:', error);
    }
  }

  async getTimeSeriesData(id: number, separationValue: number) {
    try {
      const startYear = 2007;
      const currentDate = dayjs();
      const yearRanges: YearRange[] = [];
      const datas = [];

      let date = dayjs().year(startYear).startOf('year');

      while (date.isBefore(currentDate)) {
        const start = date.format('YYYY-MM-DD');
        let end = date.add(separationValue - 1, 'day');
        if (end.isAfter(currentDate)) end = currentDate;
        const endFormatted = end.format('YYYY-MM-DD');

        const data = await this.findByRange(id, { start, end: endFormatted });

        datas.push(data);
        yearRanges.push({ start, end: endFormatted });

        date = date.add(separationValue, 'day');
      }

      console.log(yearRanges);
      console.log(datas);
    } catch (error) {
      console.log('🚀  error:', error);
    }
  }

  async findSeparationData(id: number, separationValue: number) {
    try {
      // const replyData: ReplyDataFormat[] = [];
      const startYear = 2007;
      const currentYear = dayjs().year();
      const yearRanges: YearRange[] = [];
      const datas = [];
      for (let year = startYear; year <= currentYear; year += separationValue) {
        const start = dayjs().year(year).startOf('year').format('YYYY-MM-DD');
        let endYear = year + separationValue - 1;
        if (endYear > currentYear) endYear = currentYear;
        const end = dayjs().year(endYear).endOf('year').format('YYYY-MM-DD');
        const data = await this.findByRange(id, { start, end });
        datas.push(data);
        yearRanges.push({ start, end });
      }
      return datas;
    } catch (error) {
      console.log('🚀  error:', error);
    }
  }

  async findByRanges(id: number, dateVal: YearRange) {
    const rawData = await this.prisma.rawData.findMany({
      where: {
        faultId: Number(id),
        dateUtc: {
          gte: new Date(dateVal.start),
          lt: new Date(dateVal.end),
        },
      },
      select: {
        dateUtc: true,
        magnitude: true,
      },
      orderBy: {
        dateUtc: 'asc',
      },
    });
    if (!rawData)
      return {
        range: dateVal,
        data: [],
      };
    const data = await rawData.map((result) => [
      Date.parse(String(result.dateUtc)),
      result.magnitude,
    ]);
    const results = {
      range: dateVal,
      data: data,
    };
    return results;
  }

  async findByRange(id: number, dateVal: YearRange) {
    const rawData = await this.prisma.rawData.findMany({
      where: {
        faultId: Number(id),
        dateUtc: {
          gte: new Date(dateVal.start),
          lte: new Date(dateVal.end),
        },
      },
      select: {
        dateUtc: true,
        magnitude: true,
      },
      orderBy: {
        dateUtc: 'asc',
      },
    });
    const fault = await this.prisma.faults.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
      },
    });

    const data = await rawData.map((result) => [
      Date.parse(String(result.dateUtc)),
      result.magnitude,
    ]);
    const results = {
      name: fault.name,
      data: data,
    };
    return results;
  }
  async getAllRecord() {
    return await this.prisma.rawData.count();
  }

  // classifyFault(utm_x: number, utm_y: number) {
  //   try {
  //     const x = Number(utm_x);
  //     const y = Number(utm_y);
  //     for (let i = 0; i < areaFaultLine.length; i++) {
  //       const faultArea = areaFaultLine[i].FAULT_AREA;
  //       const polygonPoints = faultArea.map((point) => [point.X, point.Y]);
  //       let inside = false;
  //       for (
  //         let i = 0, j = polygonPoints.length - 1;
  //         i < polygonPoints.length;
  //         j = i++
  //       ) {
  //         const xi = polygonPoints[i][0];
  //         const yi = polygonPoints[i][1];
  //         const xj = polygonPoints[j][0];
  //         const yj = polygonPoints[j][1];
  //         const intersect =
  //           yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
  //         if (intersect) inside = !inside;
  //       }
  //       if (inside) {
  //         return Number(data[i].FAULT_ID);
  //       }
  //     }
  //     return null;
  //   } catch (error) {
  //     console.log('🚀  error:class', error);
  //   }
  // }
  findIdByName(name: string) {
    if (!name) return null;
    const faults = {
      ['KHLONG MARUI']: 1,
      ['MAE CHAN']: 2,
      ['MAE HONG SON']: 3,
      ['MAE ING']: 4,
      ['MOEI']: 5,
      ['MAE THA']: 6,
      ['THOEN']: 7,
      ['PHETCHABUN']: 8,
      ['PUA']: 9,
      ['PHA YAO']: 10,
      ['RANONG']: 11,
      ['SI SAWAT']: 12,
      ['THREE PAGODA']: 13,
      ['UTTARADIT']: 14,
      ['WIANG HAENG']: 15,
      ['MAE LAO']: 16,
    };

    if (!faults[name]) return null;
    return faults[name];
  }
  insidePolygon(point: Point, polygon: Polygon) {
    const x = point[0];
    const y = point[1];

    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0],
        yi = polygon[i][1];
      const xj = polygon[j][0];
      const yj = polygon[j][1];

      const intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  }

  isPointInPolygon(point: Point, polygon: Polygon): boolean {
    let isInside = false;
    for (const path of polygon) {
      let intersections = 0;
      for (let i = 0; i < path.length; i++) {
        const start = path[i];
        const end = path[(i + 1) % path.length]; // Go back to the start point when we reach the end of the path

        if (
          start[1] > point[1] !== end[1] > point[1] && // One point is above, and the other is below the ray
          point[0] <
            ((end[0] - start[0]) * (point[1] - start[1])) /
              (end[1] - start[1]) +
              start[0] // The ray intersects the line segment
        ) {
          intersections++;
        }
      }
      if (intersections % 2 === 1) {
        isInside = !isInside; // Toggle the state every time a path is crossed
      }
    }
    return isInside;
  }
  classifyFaultEvent(utm_x: number, utm_y: number) {
    try {
      const x = Number(utm_x);
      const y = Number(utm_y);
      const point: Point = [x, y]; // Replace with the point you want to check
      // console.log(this.isPointInPolygon(point, polygon));
      for (let i = 0; i < FaultLineConvex.length; i++) {
        const tempPath: Polygon = FaultLineConvex[i].area;
        const inside = this.insidePolygon(point, tempPath);
        if (inside) {
          return {
            inside: true,
            fId: Number(this.findIdByName(FaultLineConvex[i].fName)),
          };
        }
      }
      return { inside: false, fId: 0 };
    } catch (error) {
      console.log('🚀  error:class', error);
    }
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
