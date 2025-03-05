import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit {
  constructor() {
    super()

    this.$extends({
      result: {
        users: {
          telegramId: {
            needs: {},
            compute(user) {
              return Number(user.telegramId)
            },
          },
        },
      },
    })
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
  async onModuleInit() {
    await this.$connect()
  }
}
