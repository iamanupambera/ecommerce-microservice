import { IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeGigStatusDto {
  @ApiProperty({
    description: 'New status of the gig (true for active, false for paused)',
  })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsMongoId()
  gigId: string;
}
