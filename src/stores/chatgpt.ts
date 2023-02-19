import { ChatGPTAPI, SendMessageOptions } from 'chatgpt'
import { makeAutoObservable } from 'mobx'
import { getChatGPTClient } from '../preload'
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
      getMessageById: async (id) => Storage.getMessage(id),
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
    const res = await this.sendMessage(content, {
      promptPrefix:
        '请给发你的内容起一个12个字以内的标题，只需要返回标题文字即可',
    })
    return res?.text.replace(/['"”“《》]/g, '') || content.slice(0, 10)
  }

  destory = () => {
    this.client = undefined
  }
})()

