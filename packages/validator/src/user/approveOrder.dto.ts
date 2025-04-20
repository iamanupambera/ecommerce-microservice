import { IsDateString, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class ApproveOrderDto {
  @IsNotEmpty()
  @IsMongoId()
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
