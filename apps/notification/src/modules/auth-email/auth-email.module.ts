import { Module } from '@nestjs/common';
import { AuthEmailService } from './auth-email.service';
import { AuthEmailController } from './auth-email.controller';
import { MailModule } from '../../modules/email/mail.module';

@Module({
  imports: [MailModule],
  controllers: [AuthEmailController],
  providers: [AuthEmailService],
})
export class AuthEmailModule {}
