import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class PipeDriveDTO {
  @IsDateString() @IsOptional()
  date: Date;
}