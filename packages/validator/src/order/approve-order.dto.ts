import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class ApproveOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  orderId: string;

  @IsNotEmpty()
  @IsMongoId()
  sellerId: string;

  @IsNotEmpty()
  @IsMongoId()
  buyerId: string;

  @IsNotEmpty()
  @IsString()
  ongoingJobs: string;

  @IsNotEmpty()
  @IsString()
  completedJobs: string;

  @IsNotEmpty()
  @IsString()
  totalEarnings: string;

  @IsNotEmpty()
  @IsString()
  purchasedGigs: string;
}
