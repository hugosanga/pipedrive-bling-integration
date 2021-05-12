import { Injectable, HttpService, InternalServerErrorException, Logger } from '@nestjs/common';
import * as moment from "moment";

@Injectable()
export class PipeDriveService {
  private logger = new Logger('PipeDriveService')
  constructor (
    private readonly http: HttpService,
  ) {}

  async getPersons(persons: number[]) {
    try {
      const personsDetails = []
      for(let i = 0; i < persons.length; i++) {
        const id = persons[i]
        const response = await this.http.get(
          `https://testlink.pipedrive.com/v1/persons/${id}`,
          { params: {
            api_token: process.env.PIPEDRIVE_API_TOKEN,
          }}
        )
          .toPromise()
          .then(resp => resp.data)
  
        personsDetails.push(response.data)
      }
  
      return personsDetails
    } catch(err) {
      this.logger.error(err.stack)
      throw new InternalServerErrorException()
    }
  }

  async getAllDayWonDeals(query) {
    try {
      const date = query.date || moment(new Date()).format('YYYY-MM-DD')

      const deals = await this.http.get(
        `https://testlink.pipedrive.com/api/v1/deals/timeline`,
        { params: {
          api_token: process.env.PIPEDRIVE_API_TOKEN,
          start_date: date,
          interval: 'day',
          amount: 1,
          field_key: 'won_time'
        }}
      )
        .toPromise()
        .then(res => res.data)
  
      return deals
    } catch(err) {
      this.logger.error(err.stack)
      throw new InternalServerErrorException()
    }
  }
}