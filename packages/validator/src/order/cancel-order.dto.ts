import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CancelOrderDto {
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
  purchasedGigs: string;

  @IsNotEmpty()
  @IsString()
  paymentIntent: string;
}
