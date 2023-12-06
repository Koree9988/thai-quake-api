import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from './prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import * as Handlebars from 'handlebars';
import dayjs from 'dayjs';

@Injectable()
export class MailsService {
  private readonly logger = new Logger(MailsService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailerService,
  ) {}
  async generateBody() {
    let bodyData = '';
    const currentDate = dayjs();
    const lastMonth = await currentDate.subtract(30, 'days');

    const last30Days = await dayjs(lastMonth).format('DD/MM/YYYY');

    const faultList = await this.prisma.faults.findMany({
      where: {},
      select: {
        id: true,
        name: true,
      },
    });
    const allFault: {
      fault_id: number;
      events: number;
      highest: number;
    }[] = await this.prisma.$queryRaw`
    SELECT fault_id, COUNT(id) as events, MAX(Magnitute) as highest
    FROM raw_data
    WHERE date_utc > ${new Date(last30Days.toString())}
    and fault_id  notnull
    GROUP BY fault_id`;
    console.log('🚀  allFault:', allFault);

    const fDat = allFault.forEach((fault) => {
      bodyData += '<tr>';
      bodyData += `<td>${
        faultList.find((item) => item.id === fault.fault_id).name
      }</td>`;
      bodyData += `<td>${fault.events}</td>`;
      bodyData += `<td>${fault.highest}</td>`;
      bodyData += '</tr>';
      return bodyData;
    });
    await Promise.all([fDat]);
    return bodyData;
  }

  //   @Cron(CronExpression.EVERY_10_SECONDS)
  @Cron('0 8 1 * *')
  async handleCron() {
    const registeredUser = await this.prisma.user.findMany({
      where: {
        role: 'NORMAL_USER',
      },
      select: {
        displayName: true,
        email: true,
      },
    });
    const dataBody = await this.generateBody();

    // Define your email template
    const template = Handlebars.compile(`
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thai Quake - Faultline Analysis Summary Report</title>
        <style>
            /* Add your custom CSS styles here */
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f5f5f5;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            h1 {
                color: #333333;
            }
    
            p {
                color: #555555;
            }
    
            .logo {
                max-width: 100%;
                height: auto;
            }
    
            table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
            }
    
            td,
            th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 5px;
            }
    
            tr:nth-child(even) {
                background-color: #dddddd;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="row col-12" style="margin: 0 auto;">
                <img style="width: 50px;" src="https://thai-quake-7msd4xrndq-as.a.run.app/img/logo.png" class="col-6 logo">
                <img style="width: 90px;" src="https://thai-quake-7msd4xrndq-as.a.run.app/img/typelogo.png"
                    class="col-6 logo">
            </div>
            <hr size="5px" color="#900d09">
            <h1>Thailand Earth Quake Analysis</h1>
            <hr size="5px" color="#900d09">
    
            <h2>Monthly Summary Report</h2>
    
            <p>Hello <strong>{{name}}</strong>,</p>
            <p>Here is a summary report of the Thailand earth quake analysis base on <b>Fourier transform</b> for the
                following
                group of faultline:</p>
            <br>
            <table>
                <thead>
                    <tr>
                        <th style="width: 40%;">Fault Group</th>
                        <th style="width: 30%;">Last Week Events</th>
                        <th>Highest Magnitude</th>
                    </tr>
                </thead>
                <tbody>
                    ${dataBody}
                </tbody>
            </table>
    
            <br>
    
    
            <p>If you have any questions or need further information, please don't hesitate to contact us.</p>
            <p>Thank you for using Thai Quake!</p>
            <p>Best regards,<br><strong>Thai Quake Team</strong></p>
        </div>
    </body>
    
    </html>
`);

    const subject = 'Monthly Summary';
    registeredUser.forEach((user) => {
      this.mailService.sendMail({
        to: user.email,
        subject: subject,
        html: template({ name: user.displayName }),
      });
    });
    this.logger.debug('Send Mail');
  }
}
