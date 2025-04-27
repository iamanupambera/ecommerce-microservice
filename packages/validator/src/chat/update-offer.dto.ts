import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateOffer {
  @IsNotEmpty()
  @IsMongoId()
  messageId: string;

  @IsNotEmpty()
  @IsEnum(['ACCEPTED', 'CANCELLED'])
  type: 'ACCEPTED' | 'CANCELLED';
}
