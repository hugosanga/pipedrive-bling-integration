import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class ListDealsDTO {
  @IsDateString() @IsOptional()
  laterThan?: Date;
}