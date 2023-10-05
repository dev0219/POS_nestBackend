import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    if (!(exception instanceof HttpException)) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const { status, message, code } = exception as any;
      if (status && status != 'error') {
        response.status(code ?? 400).json(message);
      }
      console.error(exception);
      response.status(500).json();
    } else {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      let status = 500;
      let responseBody;
      try {
        status = exception?.getStatus() || 500;
        responseBody = exception.getResponse();
      } catch {
        console.error(exception);
      }

      response.status(status).json(responseBody);
    }
  }
}
