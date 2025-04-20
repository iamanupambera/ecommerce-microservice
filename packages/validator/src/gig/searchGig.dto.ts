import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class SearchGigDto {
  @IsNotEmpty()
  @IsString()
  searchQuery: string;

  @IsNotEmpty()
  @IsNumberString()
  from: number;

  @IsNotEmpty()
  @IsNumberString()
  size: number;

  @IsNotEmpty()
  @IsEnum(['forward', 'backward'])
  type: 'forward' | 'backward';

  @IsOptional()
  @IsString()
  deliveryTime?: string;

  @ValidateIf((val) => !!val.max)
  @IsNotEmpty()
  @IsNumberString()
  min?: number;

  @ValidateIf((val) => !!val.min)
  @IsNotEmpty()
  @IsNumberString()
  max?: number;
}
