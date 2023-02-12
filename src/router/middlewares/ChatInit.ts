import { Middleware, MiddlewareContext } from 'oh-router'
import { chatStore } from '../../stores/chat'
import { Meta } from '../routes'

export class ChatInit implements Middleware {
  register(ctx: MiddlewareContext<Meta>): boolean {
    return ctx.to.pathname === '/'
  }

  async handler(
    ctx: MiddlewareContext<Meta>,
    next: () => Promise<any>
  ): Promise<void> {
    chatStore.init()
    next()
  }
}

