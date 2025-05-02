import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGigDto {
  @ApiProperty({ description: 'MongoDB ID of the seller' })
  @IsNotEmpty()
  @IsMongoId()
  sellerId: string;

  @ApiProperty({ description: 'Profile picture URL' })
  @IsNotEmpty()
  @IsString()
  profilePicture: string;

  @ApiProperty({ description: 'Gig title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Detailed description of the gig' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Main category of the gig' })
  @IsNotEmpty()
  @IsString()
  categories: string;

  @ApiProperty({ type: [String], description: 'List of subcategories' })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @Length(1)
  subCategories: string[];

  @ApiProperty({ type: [String], description: 'List of relevant tags' })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @Length(1)
  tags: string[];

  @ApiProperty({ description: 'Price of the gig', minimum: 4.99, type: Number })
  @IsNotEmpty()
  @IsNumber()
  @Min(4.99)
  price: number;

  @ApiProperty({ description: 'Cover image URL' })
  @IsNotEmpty()
  @IsString()
  coverImage: string;

  @ApiProperty({ description: 'Expected delivery time (e.g., "3 days")' })
  @IsNotEmpty()
  @IsString()
  expectedDelivery: string;

  @ApiProperty({ description: 'Basic gig package title' })
  @IsNotEmpty()
  @IsString()
  basicTitle: string;

  @ApiProperty({ description: 'Description of the basic gig package' })
  @IsNotEmpty()
  @IsString()
  basicDescription: string;
}
