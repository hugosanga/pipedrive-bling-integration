import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DealsDocument = Deals & Document;

@Schema({
  collection: 'LinkTest_deals'
})
export class Deals {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  success: boolean;

  @Prop({ type: Object })
  total: total;

  @Prop({ type: Array })
  failedOrders: failedOrders
}

export const DealsSchema = SchemaFactory.createForClass(Deals);