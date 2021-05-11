import { HttpModule, Module } from '@nestjs/common';
import { BlingService } from './bling.service'

@Module({
  imports: [HttpModule],
  providers: [BlingService],
  exports: [BlingService]
})
export class BlingModule {}
