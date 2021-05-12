import { HttpModule, Module } from '@nestjs/common';
import { PipeDriveService } from './pipedrive.service'

@Module({
  imports: [HttpModule],
  providers: [PipeDriveService],
  exports: [PipeDriveService]
})
export class PipeDriveModule {}
