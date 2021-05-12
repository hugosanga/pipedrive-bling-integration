import { Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { DealsDocument } from './deals.schema';
import { DealsService } from './deals.service';
import { ListDealsDTO } from './dto/get-deal.dto';

@Controller('deals')
export class DealsController {
  constructor(
    private readonly dealsService: DealsService
  ) { }

  @Get()
  @UsePipes(ValidationPipe)
  async getDeals(
    @Query() query: ListDealsDTO
  ): Promise<{deals: DealsDocument[], pagination: {limit: number, lastDate: Date, total: number}}> {
    return await this.dealsService.listAllDeals(query)
  }

}