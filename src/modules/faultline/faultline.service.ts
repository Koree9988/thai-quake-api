import { HttpException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma.service';
import data from 'src/data/faultPosition.json';
import fData from 'src/data/convex-hull-polygon.json';
import {
  // CreateFaultlineRequest,
  // UpdateFaultlineRequest,
  CreateFaultAreaRequest,
  findAllFaultlineRequest,
} from './faultline.request';
import { FaultlineRepository } from './faultline.repository';
import * as turf from '@turf/turf';
import { PolygonData } from 'src/base/model';

@Injectable()
export class FaultlineService {
  private logger = new Logger(FaultlineService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly repository: FaultlineRepository,
  ) {}

  // create(createFaultAreaDto: UpdateFaultlineRequest) {
  //   return 'This action adds a new faultline';
  // }
  // async allCreate() {
  //   try {
  //     for (let index = 0; index < data.length; index++) {
  //       const element = data[index];

  //       const lats = [];
  //       const longs = [];
  //       const utmsX = [];
  //       const utmsY = [];

  //       for (let index = 0; index < element.FAULT_AREA.length; index++) {
  //         const s = element.FAULT_AREA[index];
  //         lats.push(s.LATITUTE);
  //         longs.push(s.LONGITUTE);
  //         utmsX.push(s.X);
  //         utmsY.push(s.Y);
  //       }
  //       const datF = {
  //         faultId: Number(element.FAULT_ID),
  //         lats: lats.join(),
  //         longs: longs.join(),
  //         utmsX: utmsX.join(),
  //         utmsY: utmsY.join(),
  //       };
  //       this.createAreaFault(datF);
  //     }
  //     return data;
  //   } catch (error) {
  //     console.log('🚀  error:', error);
  //   }
  // }

  async createAreaFault(createFaultAreaDto: CreateFaultAreaRequest) {
    return await this.prisma.faultArea.create({
      data: createFaultAreaDto,
    });
  }

  async createArea(id: number, createFaultAreaDto: CreateFaultAreaRequest) {
    return await this.prisma.faultArea.create({
      data: {
        ...createFaultAreaDto,
        faultId: id,
      },
    });
  }

  async findAll(query: findAllFaultlineRequest) {
    try {
      return await this.repository.findAllFaultByQuery(query);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.faults.findMany({
        where: {
          id: Number(id),
        },
        orderBy: {
          id: 'asc',
        },
      });
    } catch (error) {
      console.log('🚀  error:', error);
    }
  }

  // update(id: number, updateFaultlineDto: UpdateFaultlineRequest) {
  //   return `This action updates a #${id} faultline`;
  // }

  remove(id: number) {
    return `This action removes a #${id} faultline`;
  }
  // Returns distance in meters (negative values for points inside) from a point to the edges of a polygon
  // distanceToPolygon({ point, polygon }) {
  //   if (polygon.type === 'Feature') {
  //     polygon = polygon.geometry;
  //   }
  //   let distance;
  //   if (polygon.type === 'MultiPolygon') {
  //     distance = polygon.coordinates
  //       .map((coords) =>
  //         this.distanceToPolygon({
  //           point,
  //           polygon: turf.polygon(coords).geometry,
  //         }),
  //       )
  //       .reduce((smallest, current) =>
  //         current < smallest ? current : smallest,
  //       );
  //   } else {
  //     if (polygon.coordinates.length > 1) {
  //       // Has holes
  //       const [exteriorDistance, ...interiorDistances] =
  //         polygon.coordinates.map((coords) =>
  //           this.distanceToPolygon({
  //             point,
  //             polygon: turf.polygon([coords]).geometry,
  //           }),
  //         );
  //       if (exteriorDistance < 0) {
  //         // point is inside the exterior polygon shape
  //         const smallestInteriorDistance = interiorDistances.reduce(
  //           (smallest, current) => (current < smallest ? current : smallest),
  //         );
  //         if (smallestInteriorDistance < 0) {
  //           // point is inside one of the holes (therefore not actually inside this shape)
  //           distance = smallestInteriorDistance * -1;
  //         } else {
  //           // find which is closer, the distance to the hole or the distance to the edge of the exterior, and set that as the inner distance.
  //           distance =
  //             smallestInteriorDistance < exteriorDistance * -1
  //               ? smallestInteriorDistance * -1
  //               : exteriorDistance;
  //         }
  //       } else {
  //         distance = exteriorDistance;
  //       }
  //     } else {
  //       // The actual distance operation - on a normal, hole-less polygon (converted to meters)
  //       distance =
  //         turf.pointToLineDistance(point, turf.polygonToLineString(polygon)) *
  //         1000;
  //       if (turf.booleanPointInPolygon(point, polygon)) {
  //         distance = distance * -1;
  //       }
  //     }
  //   }
  //   return distance;
  // }

  // async getClassForPoint(x: number, y: number) {
  //   const point = turf.point([x, y]);
  //   const polygonsData: PolygonData[] = fData;
  //   for (let index = 0; index < polygonsData.length; index++) {
  //     const polyLine = polygonsData[index].area;
  //     const polygon = turf.polygon(polyLine);
  //   }
  // }
}
