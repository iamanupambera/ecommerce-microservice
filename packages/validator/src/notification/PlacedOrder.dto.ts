import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PlacedOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  orderDue: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

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
  @IsString()
  requirements: string;

  @IsNotEmpty()
  @IsString()
  orderUrl: string;

  @IsNotEmpty()
  @IsString()
  receiverEmail: string;
}
