import {
  IsOptional,
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsMongoId,
  IsDateString,
  IsNumber,
  ValidateIf,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

class Offer {
  @IsOptional()
  @IsString()
  gigTitle: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  deliveryInDays: number;

  @IsOptional()
  @IsDateString()
  oldDeliveryDate: string;

  @IsOptional()
  @IsDateString()
  newDeliveryDate: string;

  @IsOptional()
  @IsEnum(['ACCEPTED', 'CANCELLED', 'PENDING'])
  status: 'ACCEPTED' | 'CANCELLED' | 'PENDING';
}

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  conversationId: string;

  @IsOptional()
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  file: string;

  @IsOptional()
  @IsString()
  fileType: string;

  @IsOptional()
  @IsString()
  fileName: string;

  @IsOptional()
  @IsString()
  fileSize: string;

  @IsOptional()
  @IsString()
  gigId: string;

  @IsNotEmpty()
  @IsMongoId()
  sellerId: string;

  @IsNotEmpty()
  @IsMongoId()
  buyerId: string;

  @IsNotEmpty()
  @IsString()
  senderUsername: string;

  @IsNotEmpty()
  @IsString()
  senderPicture: string;

  @IsNotEmpty()
  @IsString()
  receiverUsername: string;

  @IsNotEmpty()
  @IsString()
  receiverPicture: string;

  @IsOptional()
  @IsBoolean()
  isRead: boolean;

  @IsOptional()
  @IsBoolean()
  hasOffer: boolean;

  @ValidateIf((val) => val.hasOffer)
  @IsNotEmpty()
  @Type(() => Offer)
  offer: Offer;
}
