import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OfferEmailDto {
  @IsNotEmpty()
  @IsString()
  buyerUsername: string;

  @IsNotEmpty()
  @IsString()
  sellerUsername: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  deliveryDays: number;

  @IsNotEmpty()
  @IsString()
  offerLink: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  receiverEmail: string;

  @IsNotEmpty()
  @IsString()
  sender: string;
}
