import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
  IsMongoId,
} from 'class-validator';

export class UpdateGigDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  categories: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @Length(1)
  subCategories: string[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @Length(1)
  tags: string[];

  @IsNotEmpty()
  @IsNumber()
  @Min(4.99)
  price: number;

  @IsNotEmpty()
  @IsString()
  coverImage: string;

  @IsNotEmpty()
  @IsString()
  expectedDelivery: string;

  @IsNotEmpty()
  @IsString()
  basicTitle: string;

  @IsNotEmpty()
  @IsString()
  basicDescription: string;
}
