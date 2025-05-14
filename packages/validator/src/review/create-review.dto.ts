import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsMongoId()
  gigId: string;

  @IsNotEmpty()
  @IsMongoId()
  reviewerId: string;

  @IsNotEmpty()
  @IsMongoId()
  orderId: string;

  @IsNotEmpty()
  @IsMongoId()
  sellerId: string;

  @IsNotEmpty()
  @IsString()
  review: string;

  @IsNotEmpty()
  @IsString()
  reviewerImage: string;

  @IsNotEmpty()
  @IsString()
  reviewerUsername: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsEnum(['buyerReview', 'sellerReview'])
  reviewType: 'buyerReview' | 'sellerReview';

  @IsNotEmpty()
  @IsNumber()
  rating?: number;
}
