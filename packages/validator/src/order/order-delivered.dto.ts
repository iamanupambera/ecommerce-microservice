import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class OrderDeliveredDto {
  @IsNotEmpty()
  @IsMongoId()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  file: string;

  @IsNotEmpty()
  @IsString()
  fileType: string;

  @IsNotEmpty()
  @IsString()
  fileSize: string;

  @IsNotEmpty()
  @IsString()
  fileName: string;
}
