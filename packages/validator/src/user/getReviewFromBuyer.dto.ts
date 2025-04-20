import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';

export class GetReviewFromBuyerDto {
  @IsNotEmpty()
  @IsMongoId()
  sellerId: string;

  @IsNotEmpty()
  @IsEnum(['1', '2', '3', '4', '5'])
  rating: '1' | '2' | '3' | '4' | '5';
}
