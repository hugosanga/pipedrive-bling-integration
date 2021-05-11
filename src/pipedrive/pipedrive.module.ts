import { HttpModule, Module } from '@nestjs/common';
import { PipeDriveController } from './pipedrive.controller';
import { PipeDriveService } from './pipedrive.service'

@Module({
  imports: [HttpModule],
  controllers: [PipeDriveController],
  providers: [PipeDriveService],
  exports: [PipeDriveService]
})
export class PipeDriveModule {}
