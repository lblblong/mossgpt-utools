import { ChatGPTAPI, SendMessageOptions } from 'chatgpt'
import { makeAutoObservable } from 'mobx'
import { Message } from '../models/message'
import { getChatGPTClient } from '../preload'
import { globalEvent } from '../shared/event'
import { Storage } from '../shared/storage'

export const chatgptStore = new (class {
  constructor() {
    makeAutoObservable(this)
  }

  private client?: ChatGPTAPI

  init = async () => {
    if (this.client) return

    const apiKey = Storage.getApiKey()
    const config = Storage.getConfig()
    this.client = getChatGPTClient({
      apiKey,
      completionParams: {
        model: config.model,
      },
      getMessageById: async (id) => {
        return utools.dbStorage.getItem('m-' + id)
      },
      upsertMessage: async (message) => {
        if (message.conversationId === 'title') return
        Storage.setMessage(Message.forChatMessage(message))
        globalEvent.emit('persistedMessage', message.id)
      },
    })
  }

  reinit = () => {
    this.client = undefined
    this.init()
  }

  sendMessage = async (text: string, opts?: SendMessageOptions) => {
    this.init()
    return this.client?.sendMessage(text, opts)
  }

  getTitle = async (content: string) => {
    const res = await this.sendMessage(
      `请为这段文字起个12个字以内的中文标题，只需要返回标题，不要包含标点符号：\n${content}`,
      {
        promptPrefix: '请用尽量简短的文字回复',
        conversationId: 'title',
      }
    )
    return res?.text.replace(/['"”“《》]/g, '') || content.slice(0, 10)
  }

  destory = () => {
    this.client = undefined
  }
})()

