import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch(WsException)
export class WebSocketExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    super.catch(exception, host);

    const client = host.switchToWs().getClient();
    const error = exception.getError();

    client.send(JSON.stringify({ event: 'error', data: error }));
  }
}
