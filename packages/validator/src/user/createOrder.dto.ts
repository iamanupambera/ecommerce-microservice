import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  sellerId: string;

  @IsNotEmpty()
  @IsNumber()
  ongoingJobs: number;
}
