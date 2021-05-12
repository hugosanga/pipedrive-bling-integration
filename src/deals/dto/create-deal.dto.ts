import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class CreateDealDTO {
  @IsDateString()
  date?: Date;

  @IsBoolean()
  success?: boolean;

  @IsObject()
  total?: total;

  @IsArray()
  failedOrders?: failedOrders;
}