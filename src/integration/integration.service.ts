import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { BlingService } from 'src/bling/bling.service';
import { DealsService } from 'src/deals/deals.service';
import { PipeDriveService } from 'src/pipedrive/pipedrive.service';
import { ResponseTypes } from 'src/utils/response.enum';
import { IntegrationDTO } from './dto/pipedrive.dto';

@Injectable()
export class IntegrationService {
  private logger = new Logger('IntegrationService')
  constructor (
    private readonly pipedriveService: PipeDriveService,
    private readonly blingService: BlingService,
    private readonly dealsService: DealsService
  ) {}

  private async handlePipeDriveError(date) {
    await this.dealsService.registerDeal({
      success: false,
      date: date,
    })
  }

  private async getDeals(query: IntegrationDTO) {
    try {
      const response = await this.pipedriveService.getAllDayWonDeals(query)
  
      if(!response.success) throw new BadGatewayException()
          
      const data = response.data[0]
      return { 
        deals: data.deals,
        date: data.period_start,
        total: data.totals.weighted_values
      }
    } catch(err) {
      await this.handlePipeDriveError(query.date || new Date())
      throw err
    }
  }

  private async getPersons(persons: number[], date: Date) {
    try {
      return await this.pipedriveService.getPersons(persons)
    }  catch(err) {
      await this.handlePipeDriveError(date)
      throw err
    }
  }

  private async postOrder(deal, person) {
    try {
      const order = [{
        code: deal.id,
        description: 'Caneta',
        unit: 'Pç',
        amount: 1,
        unit_price: 1.99
      }]
      const client = {
        name: person.name,
        email: person.email.map(aux => aux.value).join(' / '),
        phone: person.phone.map(aux => aux.value).join(' / '),
      }
      
      await this.blingService.postOrder(client, order)
      return ResponseTypes.RESOLVED
    } catch(err) {
      return ResponseTypes.REJECTED
    }
  }

  async pipeDriveWonsToBlingOrders(query: IntegrationDTO) {
    const { deals, date, total } = await this.getDeals(query)

    const persons: number[] = Array.from(new Set(deals.map(deal => deal.person_id)))
    const personsDetails = await this.getPersons(persons, date)

    const failedOrders = []

    for(let i = 0; i < deals.length; i++) {
      const deal = deals[i]
      const person = personsDetails.filter(p => p.id === deal.person_id)[0]

      const resp = await this.postOrder(deal, person)
      if(resp === ResponseTypes.REJECTED) failedOrders.push({deal, person})
    }

    await this.dealsService.registerDeal({
      date,
      success: true,
      failedOrders,
      total,
    })
    
    return deals
  }
}