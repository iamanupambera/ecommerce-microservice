import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';

export class BuyerPurchasedGigUpdateDto {
  @IsNotEmpty()
  @IsMongoId()
  buyerId: string;

  @IsNotEmpty()
  @IsMongoId()
  purchasedGigId: string;

  @IsNotEmpty()
  @IsEnum(['purchased-gigs', 'cancel-order'])
  type: 'purchased-gigs' | 'cancel-order';
}
