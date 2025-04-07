# JSX email templates

- `components` Holds reusable patterns
- `templates` A template equals a type of email sent

## Usage

```ts
import { renderEmail } from '@repo/emails';

await renderEmail('VerifyEmail', {
  appLink: `${this.configService.getOrThrow('CLIENT_URL')}`,
  appIcon,
  verifyLink,
});
```

The first argument is the template name as defined inside `templates/index.ts`. The second argument are the template props.

## Development

You can use an API endpoint to preview the email HTML, there's already one on `/apps/notification/src/modules/email/mail.service.ts`
