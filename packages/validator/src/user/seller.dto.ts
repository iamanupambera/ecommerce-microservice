import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

class LanguageDto {
  @IsNotEmpty()
  @IsString()
  language: string;

  @IsNotEmpty()
  @IsString()
  level: string;
}

class ExperienceDto {
  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  currentlyWorkingHere: boolean;
}

class EducationDto {
  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  university: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  major: string;

  @IsNotEmpty()
  @IsString()
  year: string;
}

class CertificateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;
}

class RatingDetail {
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsNumber()
  count: number;
}

class RatingsDto {
  @ValidateNested()
  @Type(() => RatingDetail)
  five: RatingDetail;

  @ValidateNested()
  @Type(() => RatingDetail)
  four: RatingDetail;

  @ValidateNested()
  @Type(() => RatingDetail)
  three: RatingDetail;

  @ValidateNested()
  @Type(() => RatingDetail)
  two: RatingDetail;

  @ValidateNested()
  @Type(() => RatingDetail)
  one: RatingDetail;
}

export class SellerDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  profilePicture: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  bio: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  skills: string[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageDto)
  languages: LanguageDto[];

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  responseTime: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experience: ExperienceDto[];

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education: EducationDto[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  socialLinks: string[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificateDto)
  certificates: CertificateDto[];

  @IsOptional()
  @IsNumber()
  ratingsCount: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => RatingsDto)
  ratingCategories: RatingsDto;

  @IsOptional()
  @IsNumber()
  ratingSum: number;

  @IsOptional()
  @IsString()
  recentDelivery: string;

  @IsOptional()
  @IsNumber()
  ongoingJobs: number;

  @IsOptional()
  @IsNumber()
  completedJobs: number;

  @IsOptional()
  @IsNumber()
  cancelledJobs: number;

  @IsOptional()
  @IsNumber()
  totalEarnings: number;

  @IsOptional()
  @IsNumber()
  totalGigs: number;

  @IsOptional()
  @IsDateString()
  createdAt: Date;
}
