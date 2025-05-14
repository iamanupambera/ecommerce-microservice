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
  @IsEnum(['buyerReview', 'sellerReview'])
  type: 'buyerReview' | 'sellerReview';
}
