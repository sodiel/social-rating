import { RequestWithTelegramContext } from '@app/common/controller/controller.model'
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import * as querystring from 'node:querystring'
import { TelegramAuthService } from '@app/common/auth/telegram/auth-telegram.service'

@Injectable()
export class TelegramAuthGuard implements CanActivate {
  private readonly logger = new Logger(TelegramAuthGuard.name)

  constructor(private readonly authService: TelegramAuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithTelegramContext>()

    if (!request.headers['authorization']) {
      return false
    }

    return this.validateRequest(request)
  }

  async validateRequest(request: RequestWithTelegramContext): Promise<boolean> {
    try {
      const auth = request.headers['authorization']

      const decoded = querystring.unescape(auth)
      if (!auth) {
        return false
      }

      const queryMap = this.authService.getQueryMap(decoded)
      const payload = await this.authService.validator.validate(queryMap)

      request.context = payload

      return true
    } catch (error) {
      this.logger.warn(`Validation failed: ${error.message} [${request.url}]`)
    }

    return false
  }
}
