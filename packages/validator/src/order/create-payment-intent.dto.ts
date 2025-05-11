import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentIntentDto {
  @IsNotEmpty()
  @IsMongoId()
  buyerId: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  line1: string;

  @IsNotEmpty()
  @IsString()
  line2: string;

  @IsNotEmpty()
  @IsString()
  postal_code: string;

  @IsNotEmpty()
  @IsString()
  state: string;
}
