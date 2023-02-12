import { message } from 'antd'
import { makeAutoObservable, toJS } from 'mobx'
import { Storage } from '../shared/storage'
import { chatgptStore } from '../stores/chatgpt'
import { Message } from './message'

export class Conversation {
  id: string
  messages: Message[] = []
  name: string
  createdAt: number

  constructor(opts?: { id?: string; name?: string; createdAt?: number }) {
    this.id = opts?.id || Date.now() + ''
    this.name = opts?.name || '新会话'
    this.createdAt = opts?.createdAt || Date.now()

    makeAutoObservable(this)
  }

  private initialized = false

  get lastMessage() {
    return this.messages[this.messages.length - 1]
  }

  init = () => {
    if (this.initialized) return
    this.messages = Storage.getMessagesByConversationId(this.id)
    this.initialized = true
  }

  check = () => {
    if (!this.lastMessage) return
    if (this.lastMessage.state !== 'persisted')
      throw Error('请等待ChatGPT回复完成')
  }

  sendMessage = async (text: string) => {
    try {
      if (this.messages.length === 0 && this.name === '新会话') {
        chatgptStore.getTitle(text).then((title) => {
          this.name = title
          this.flushDb()
        })
      }

      const lastMessage = this.lastMessage

      const message = new Message({
        role: 'user',
        text,
        createdAt: Date.now(),
        state: 'sending',
        conversationId: this.id,
      }).waitPersisted()
      this.messages.push(message)
      this.flushDb()

      let chatgptMessage: Message

      await chatgptStore.sendMessage(text, {
        conversationId: lastMessage?.conversationId,
        parentMessageId: lastMessage?.id,
        messageId: message.id,
        promptPrefix: '你好',
        onProgress: ({ id, text }) => {
          if (!chatgptMessage) {
            chatgptMessage = new Message({
              id,
              role: 'assistant',
              text: text,
              createdAt: Date.now(),
              state: 'sending',
              conversationId: this.id,
            }).waitPersisted()
            this.messages.push(chatgptMessage)
            this.flushDb()
          } else {
            chatgptMessage.text = text
          }
          chatgptMessage.text = text
        },
      })
    } catch (err: any) {
      console.log(err)
      message.error(err.message)
    }
  }

  flushDb = () => {
    Storage.setConversation(this)
    return this
  }
}

