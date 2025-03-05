import { TelegramUserData } from '@telegram-auth/server'
import { Request } from 'express'

export type RequestWithContext<TContext> = Request & { context: TContext }

export type RequestWithTelegramContext = RequestWithContext<TelegramUserData>
