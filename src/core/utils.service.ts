// import { HttpException, Injectable, Logger } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class UtilsService {
//   private logger = new Logger(UtilsService.name);

//   async encryptPassword(password: string) {
//     try {
//       return await bcrypt.hash(password, 10);
//     } catch (error) {
//       this.logger.error(error.message);
//       throw new HttpException(error.message, error.status);
//     }
//   }

//   async comparePassword(password: string, hash: string) {
//     try {
//       return await bcrypt.compare(password, hash);
//     } catch (error) {
//       this.logger.error(error.message);
//       throw new HttpException(error.message, error.status);
//     }
//   }
// }
