import { Module } from '@nestjs/common';
import { BlingModule } from 'src/bling/bling.module';
import { DealsModule } from 'src/deals/deals.module';
import { PipeDriveModule } from 'src/pipedrive/pipedrive.module';
import { IntegrationController } from './integration.controller';
import { IntegrationService } from './integration.service'

@Module({
  imports: [
    PipeDriveModule,
    BlingModule,
    DealsModule
  ],
  controllers: [IntegrationController],
  providers: [IntegrationService],
})
export class IntegrationModule {}
