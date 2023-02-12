import { ChatMessage } from 'chatgpt'
import { makeAutoObservable } from 'mobx'
import { globalEvent } from '../shared/event'

export class Message implements ChatMessage {
  id!: string
  text!: string
  createdAt!: number
  role!: 'user' | 'assistant'
  state: 'sending' | 'failed' | 'persisted' = 'sending'
  parentMessageId?: string
  conversationId!: string

  constructor(
    opts: Pick<
      Message,
      | 'text'
      | 'createdAt'
      | 'role'
      | 'state'
      | 'conversationId'
      | 'parentMessageId'
    > & { id?: string }
  ) {
    // const id = opts.id || randomId()
    const id = opts.id || Date.now() + ''
    Object.assign(this, { ...opts, id })

    makeAutoObservable(this)
  }

  onPersisted = (id: string) => {
    if (this.id !== id) return
    this.state = 'persisted'
    globalEvent.off('persistedMessage', this.onPersisted)
  }

  waitPersisted = () => {
    globalEvent.on('persistedMessage', this.onPersisted)
    return this
  }

  static forChatMessage(message: ChatMessage) {
    return new Message({
      ...message,
      conversationId: message.conversationId!,
      state: 'persisted',
      createdAt: Date.now(),
    })
  }
}

