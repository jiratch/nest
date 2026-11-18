// filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { getExceptionMessage } from '../../../util/handleMessage.js';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx    = host.switchToHttp();
    const res    = ctx.getResponse();
    const status = exception.getStatus();
    const body   = exception.getResponse();

    res.status(status).json({
      success: false,
      statusCode: status,
      message: getExceptionMessage(body),
      timestamp: new Date().toISOString(),
    });
  }
}