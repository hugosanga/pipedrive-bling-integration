import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { BlingModule } from './bling/bling.module';
import { mongooseConfig, mongooseUri } from './config/mongoose.config';
import { DealsModule } from './deals/deals.module';
import { IntegrationModule } from './integration/integration.module';
import { PipeDriveModule } from './pipedrive/pipedrive.module'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(mongooseUri, mongooseConfig),
    
    IntegrationModule,
    PipeDriveModule,
    BlingModule,
    DealsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
