import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { Deals, DealsDocument } from './deals.schema';
import { CreateDealDTO } from './dto/create-deal.dto';
import { ListDealsDTO } from './dto/get-deal.dto';

@Injectable()
export class DealsService {
  private logger = new Logger('DealsService')
  constructor(
    @InjectModel(Deals.name) private dealsModel: Model<DealsDocument>
  ) { }

  async registerDeal(newDeal: CreateDealDTO): Promise<DealsDocument> {
    try {
      const date = moment(newDeal.date).startOf('day').toDate()
      let deal = await this.dealsModel.findOne({ date })
  
      if(!deal)
        deal = new this.dealsModel({...newDeal, date});
      else
        deal.success = newDeal.success
        deal.failedOrders = newDeal.failedOrders
        deal.total = newDeal.total
  
      return await deal.save();
    } catch(err) {
      throw new InternalServerErrorException(err.stack)
    }
  }

  async listAllDeals(
    query: ListDealsDTO
  ): Promise<{deals: DealsDocument[], pagination: {limit: number, lastDate: Date, total: number}}> {
    try {
      const queryDate = moment(query.laterThan || new Date(), 'YYYY-MM-DD').startOf('day').toDate()
      const resp = await this.dealsModel.find({ date: { $gte: queryDate }})
        .limit(100)
        .sort('+date')

      const lastDate = resp.length ? resp.slice(-1)[0].date : null
      const total = await this.dealsModel.countDocuments()

      return {
        deals: resp,
        pagination: {
          limit: 100,
          lastDate,
          total
        }
      }
    } catch (err) {
      throw new InternalServerErrorException(err.stack)
    }
  }
}