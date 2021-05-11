import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { DealsController } from './deals.controller';
import { Deals, DealsSchema } from './deals.schema';
import { DealsService } from './deals.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deals.name, schema: DealsSchema }])
  ],
  controllers: [DealsController],
  providers: [DealsService],
  exports: [DealsService]
})
export class DealsModule {}
