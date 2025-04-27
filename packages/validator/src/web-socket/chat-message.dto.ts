import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ChatMessageDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
