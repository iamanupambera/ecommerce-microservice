import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  originalDate: string;

  @IsNotEmpty()
  @IsString()
  newDate: string;

  @IsNotEmpty()
  @IsNumber()
  days: number;

  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsOptional()
  @IsDateString()
  deliveryDateUpdate: Date;

  @IsNotEmpty()
  @IsEnum(['APPROVE', 'REJECT'])
  type: 'APPROVE' | 'REJECT';
}
