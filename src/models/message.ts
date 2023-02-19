import { ChatMessage } from 'chatgpt'
import { makeAutoObservable } from 'mobx'
import { Storage } from '../shared/storage'

export type MessageState = 'sending' | 'fail' | 'done'

export class Message implements ChatMessage {
  id!: string
  text!: string
  createdAt!: number
  role!: 'user' | 'assistant'
  state: MessageState = 'sending'
  failedReason?: string
  parentMessageId?: string
  conversationId!: string

  get self() {
    return this.role === 'user'
  }

  constructor(
    opts: Pick<
      Message,
      | 'text'
      | 'createdAt'
      | 'role'
      | 'state'
      | 'conversationId'
      | 'parentMessageId'
      | 'failedReason'
    > & { id?: string }
  ) {
    if (opts.id && opts.state === 'sending') {
      opts.state = 'fail'
      opts.failedReason = '意外退出'
    }
    const id =
      opts.id || `${opts.conversationId}-${opts.createdAt}-${opts.role}`
    Object.assign(this, { ...opts, id })

    makeAutoObservable(this)
  }

  flushDb = () => {
    Storage.setMessage(this)
    return this
  }
}

