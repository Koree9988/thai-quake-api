import { Injectable, Logger } from '@nestjs/common';
import { separationDataRequest } from './data-separation.request';
import { HttpService } from '@nestjs/axios';
import { FaultlineGeo, FaultlineGeometry } from 'src/base/model';
import { PrismaService } from 'src/core/prisma.service';

@Injectable()
export class DataSeparationService {
  private logger = new Logger(DataSeparationService.name);
  constructor(
    private readonly httpServ: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async findAllInFaultGroup(faultName: string): Promise<FaultlineGeometry[]> {
    const faultData: FaultlineGeometry[] = [];
    const GIS_URL = `https://gisportal.dmr.go.th/arcgis/rest/services/HAZARD/ZONE_ACTIVEFAULT/MapServer/find?searchText=${faultName}&contains=false&layers=${faultName}+&returnGeometry=true&spatialFilter=&f=pjson`;
    const res = await this.httpServ.get(GIS_URL).toPromise();

    const resData = res.data.results;
    resData.forEach(function (element) {
      faultData.push({
        faulltGroupTh: element.attributes.ชื่อกลุ่มรอยเลื่อนมีพลังภาษาไทย,
        faulltGroupEn: element.attributes.ชื่อกลุ่มรอยเลื่อนมีพลังภาษาอังกฤษ,
        faultNameTh: element.attributes.ชื่อรอยเลื่อนย่อยภาษาไทย,
        faultNameEn: element.attributes.ชื่อรอยเลื่อนย่อยภาษาอังกฤษ,
        paths: element.geometry.paths,
      });
    });
    return faultData;
  }

  findFaultline(data: separationDataRequest) {
    return `This action returns all dataSeparation`;
  }
}
