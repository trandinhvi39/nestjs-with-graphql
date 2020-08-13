import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception.getStatus();

    console.log(exception.getResponse()['message']);

    switch (status) {
      case 400:
        return new UserInputError(exception.getResponse()['message']);
      default:
        return new Error('Server Error');
    }
  }
}
