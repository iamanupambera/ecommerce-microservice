import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
  IsMongoId,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGigDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @ApiProperty({ description: 'Updated title of the gig' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Updated description of the gig' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Updated main category' })
  @IsNotEmpty()
  @IsString()
  categories: string;

  @ApiProperty({ type: [String], description: 'Updated subcategories' })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @Length(1)
  subCategories: string[];

  @ApiProperty({ type: [String], description: 'Updated tags' })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @Length(1)
  tags: string[];

  @ApiProperty({ description: 'Updated price of the gig', minimum: 4.99 })
  @IsNotEmpty()
  @IsNumber()
  @Min(4.99)
  price: number;

  @ApiProperty({ description: 'Updated cover image URL' })
  @IsNotEmpty()
  @IsString()
  coverImage: string;

  @ApiProperty({ description: 'Updated expected delivery time' })
  @IsNotEmpty()
  @IsString()
  expectedDelivery: string;

  @ApiProperty({ description: 'Updated basic gig package title' })
  @IsNotEmpty()
  @IsString()
  basicTitle: string;

  @ApiProperty({ description: 'Updated description of the basic package' })
  @IsNotEmpty()
  @IsString()
  basicDescription: string;
}
