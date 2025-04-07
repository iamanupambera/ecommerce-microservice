import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateGigsCountDto {
  @IsNotEmpty()
  @IsString()
  gigSellerId: string;

  @IsNotEmpty()
  @IsNumber()
  count: number;
}
