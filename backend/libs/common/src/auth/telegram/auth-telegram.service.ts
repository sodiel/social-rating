import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthDataValidator, urlStrToAuthDataMap } from '@telegram-auth/server'

@Injectable()
export class TelegramAuthService {
  private readonly _validator: AuthDataValidator

  constructor(private readonly configService: ConfigService) {
    this._validator = new AuthDataValidator({
      botToken: this.configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN'),
    })
  }

  get validator(): Readonly<AuthDataValidator> {
    return Object.freeze(this._validator)
  }

  getQueryMap(query: string): Map<string, string> {
    return urlStrToAuthDataMap(`http://localhost?${query}`)
  }
}
