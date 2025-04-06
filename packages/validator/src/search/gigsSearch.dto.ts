import {
  IsString,
  IsOptional,
  IsNumber,
  IsIn,
  ValidateNested,
  IsObject,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class PaginationDto {
  @IsString()
  from: string;

  @IsNumber()
  size: number;

  @IsIn(['forward', 'backward'])
  type: 'forward' | 'backward';
}

export class GigsSearchDto {
  @IsString()
  searchQuery: string;

  @ValidateNested()
  @Type(() => PaginationDto)
  @IsObject()
  pagination: PaginationDto;

  @IsOptional()
  @IsString()
  deliveryTime?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  min?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  max?: number;
}
