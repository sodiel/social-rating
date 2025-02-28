import { HttpException, ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const status = exception.getStatus()

    const error: ErrorContext = {
      statusCode: status,
      message: exception.message,
      timestamp: new Date(),
    }

    response.status(200).json({
      success: false,
      error,
    })
  }
}

export type ErrorContext = {
  statusCode: number
  message: string
  timestamp: Date
}
