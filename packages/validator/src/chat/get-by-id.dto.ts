import { IsMongoId, IsNotEmpty } from 'class-validator';

export class GetByIdDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
