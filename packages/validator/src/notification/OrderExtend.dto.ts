import { IsNotEmpty, IsString } from 'class-validator';

export class OrderExtendDto {
  @IsNotEmpty()
  @IsString()
  buyerUsername: string;

  @IsNotEmpty()
  @IsString()
  sellerUsername: string;

  @IsNotEmpty()
  @IsString()
  originalDate: string;

  @IsNotEmpty()
  @IsString()
  newDate: string;

  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsNotEmpty()
  @IsString()
  orderUrl: string;

  @IsNotEmpty()
  @IsString()
  receiverEmail: string;
}
