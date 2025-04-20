import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CancelOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  sellerId: string;
}
