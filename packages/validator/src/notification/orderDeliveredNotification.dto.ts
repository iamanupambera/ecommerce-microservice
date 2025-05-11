import { IsNotEmpty, IsString } from 'class-validator';

export class OrderDeliveredNotificationDto {
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
  orderUrl: string;

  @IsNotEmpty()
  @IsString()
  receiverEmail: string;
}
