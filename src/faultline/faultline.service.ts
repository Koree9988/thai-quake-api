import { Injectable } from '@nestjs/common';
import {
  findAllFaultlineRequest,
  CreateFaultlineRequest,
  UpdateFaultlineRequest,
} from './faultline.request';

@Injectable()
export class FaultlineService {
  create(createFaultlineDto: CreateFaultlineRequest) {
    return 'This action adds a new faultline';
  }

  findAll() {
    return `This action returns all faultline`;
  }

  findOne(id: number) {
    return `This action returns a #${id} faultline`;
  }

  update(id: number, updateFaultlineDto: UpdateFaultlineRequest) {
    return `This action updates a #${id} faultline`;
  }

  remove(id: number) {
    return `This action removes a #${id} faultline`;
  }
}
