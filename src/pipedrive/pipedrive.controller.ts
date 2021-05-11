import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PipeDriveDTO } from './dto/pipedrive.dto';
import { PipeDriveService } from './pipedrive.service';

@Controller('pipedrive')
export class PipeDriveController {
  constructor(private readonly pipedriveService: PipeDriveService) {}

  @Get('/deals')
  // @UsePipes(ValidationPipe)
  async getAllDeals(
    @Query() query: PipeDriveDTO
  ) {
    console.log(query)
    return await this.pipedriveService.getAllDayWonDeals(query);
  }
}