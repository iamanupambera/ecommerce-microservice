import { IsMongoId, IsNotEmpty } from 'class-validator';

export class findByIdDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
