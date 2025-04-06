import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class BuyerPurchasedGigUpdateDto {
  @IsNotEmpty()
  @IsString()
  buyerId: string;

  @IsNotEmpty()
  @IsString()
  purchasedGigId: string;

  @IsNotEmpty()
  @IsEnum(['purchased-gigs', 'remove-gigs'])
  type: 'purchased-gigs' | 'remove-gigs';
}
