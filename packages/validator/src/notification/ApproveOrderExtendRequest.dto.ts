import { IsNotEmpty, IsString } from 'class-validator';

export class ApproveOrderExtendRequestDto {
  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  buyerUsername: string;

  @IsNotEmpty()
  @IsString()
  sellerUsername: string;

  @IsNotEmpty()
  @IsString()
  orderUrl: string;

  @IsNotEmpty()
  @IsString()
  header: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  receiverEmail: string;
}
