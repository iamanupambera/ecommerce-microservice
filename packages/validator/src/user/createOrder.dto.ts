import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  sellerId: string;

  @IsNotEmpty()
  @IsNumber()
  ongoingJobs: number;
}
