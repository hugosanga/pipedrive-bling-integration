import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class IntegrationDTO {
  @IsDateString() @IsOptional()
  date: Date;
}