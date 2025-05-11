import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

class OfferDto {
  @IsNotEmpty()
  @IsString()
  gigTitle: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  deliveryInDays: number;

  @IsNotEmpty()
  @IsDateString()
  oldDeliveryDate: string;

  @IsOptional()
  @IsDateString()
  newDeliveryDate: string;

  @IsNotEmpty()
  @IsEnum(['CANCELLED', 'ACCEPT'])
  status: 'CANCELLED' | 'ACCEPT';
}

class RequestExtensionDto {
  @IsString()
  @IsNotEmpty()
  originalDate: string;

  @IsString()
  @IsNotEmpty()
  newDate: string;

  @IsNumber()
  days: number;

  @IsString()
  @IsNotEmpty()
  reason: string;
}

class DeliveredWorkDto {
  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  file?: string;
}

class EventsDto {
  @IsString()
  @IsNotEmpty()
  placeOrder: string;

  @IsString()
  @IsNotEmpty()
  requirements: string;

  @IsString()
  @IsNotEmpty()
  orderStarted: string;

  @IsOptional()
  @IsString()
  deliveryDateUpdate?: string;

  @IsOptional()
  @IsString()
  orderDelivered?: string;

  @IsOptional()
  @IsString()
  buyerReview?: string;

  @IsOptional()
  @IsString()
  sellerReview?: string;
}

class ReviewDto {
  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsString()
  review?: string;
}

export class CreateOrderDto {
  @ValidateNested()
  @Type(() => OfferDto)
  @IsNotEmpty()
  offer: OfferDto;

  @IsString()
  @IsNotEmpty()
  gigId: string;

  @IsString()
  @IsNotEmpty()
  sellerId: string;

  @IsString()
  @IsNotEmpty()
  sellerUsername: string;

  @IsString()
  @IsNotEmpty()
  sellerEmail: string;

  @IsString()
  @IsNotEmpty()
  sellerImage: string;

  @IsString()
  @IsNotEmpty()
  gigCoverImage: string;

  @IsString()
  @IsNotEmpty()
  gigMainTitle: string;

  @IsString()
  @IsNotEmpty()
  gigBasicTitle: string;

  @IsString()
  @IsNotEmpty()
  gigBasicDescription: string;

  @IsString()
  @IsNotEmpty()
  buyerId: string;

  @IsString()
  @IsNotEmpty()
  buyerUsername: string;

  @IsString()
  @IsNotEmpty()
  buyerEmail: string;

  @IsString()
  @IsNotEmpty()
  buyerImage: string;

  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  serviceFee?: number;

  @IsOptional()
  @IsString()
  requirements: string;

  @IsString()
  @IsNotEmpty()
  paymentIntent: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => RequestExtensionDto)
  requestExtension: RequestExtensionDto;

  @IsOptional()
  @IsBoolean()
  delivered: boolean;

  @IsOptional()
  @IsString()
  approvedAt?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeliveredWorkDto)
  deliveredWork?: DeliveredWorkDto[];

  @IsOptional()
  @IsString()
  dateOrdered?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => EventsDto)
  events?: EventsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ReviewDto)
  buyerReview: ReviewDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ReviewDto)
  sellerReview: ReviewDto;
}
