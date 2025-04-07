import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class GetReviewFromBuyerDto {
  @IsNotEmpty()
  @IsString()
  sellerId: string;

  @IsNotEmpty()
  @IsEnum(['1', '2', '3', '4', '5'])
  rating: '1' | '2' | '3' | '4' | '5';
}
