import { Middleware, MiddlewareContext } from 'oh-router'
import { toLaunch } from '../../pages/launch/route'
import { Storage } from '../../shared/storage'
import { Meta } from '../routes'

export class ApiKeyCheck implements Middleware {
  register(ctx: MiddlewareContext<Meta>): boolean {
    return !!ctx.to.meta.mustApiKey
  }

  async handler(
    ctx: MiddlewareContext<Meta>,
    next: () => Promise<any>
  ): Promise<void> {
    const apiKey = Storage.getApiKey()
    if (!apiKey) {
      toLaunch()
      return
    }
    next()
  }
}

