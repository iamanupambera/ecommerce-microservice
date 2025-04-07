import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ApproveOrderDto {
  @IsNotEmpty()
  @IsString()
  sellerId: string;

  @IsNotEmpty()
  @IsNumber()
  ongoingJobs: number;

  @IsNotEmpty()
  @IsNumber()
  completedJobs: number;

  @IsNotEmpty()
  @IsNumber()
  totalEarnings: number;

  @IsNotEmpty()
  @IsDateString()
  recentDelivery: Date;
}
