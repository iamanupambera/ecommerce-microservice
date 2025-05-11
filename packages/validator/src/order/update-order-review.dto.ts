import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateOrderReviewDto {
  @IsNotEmpty()
  @IsMongoId()
  orderId: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  review: string;

  @IsNotEmpty()
  @IsEnum(['buyer-review', 'seller-review'])
  type: 'buyer-review' | 'seller-review';
}
