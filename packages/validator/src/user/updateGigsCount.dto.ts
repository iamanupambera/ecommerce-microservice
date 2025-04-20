import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateGigsCountDto {
  @IsNotEmpty()
  @IsMongoId()
  gigSellerId: string;

  @IsNotEmpty()
  @IsNumber()
  count: number;
}
