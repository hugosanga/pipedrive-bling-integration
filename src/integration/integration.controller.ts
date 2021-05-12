import { Controller, Get, Query } from '@nestjs/common';
import { IntegrationDTO } from './dto/pipedrive.dto';
import { IntegrationService } from './integration.service';

@Controller('integration')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Get('/')
  async pipeDriveWonsToBlingOrders(
    @Query() query: IntegrationDTO
  ) {
    return await this.integrationService.pipeDriveWonsToBlingOrders(query)
  }
}