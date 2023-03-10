import { ChatGPTAPI, SendMessageOptions } from '@libeilong/chatgpt'
import { makeAutoObservable } from 'mobx'
import { getChatGPTClient } from '../preload'
import { Storage } from '../shared/storage'

export const chatgptStore = new (class {
  constructor() {
    makeAutoObservable(this, {
      client: false,
    })
  }

  client?: ChatGPTAPI

  init = async () => {
    if (this.client) return

    const apiKey = Storage.getApiKey()
    const config = Storage.getConfig()

    this.client = getChatGPTClient({
      apiKey,
      completionParams: {
        model: config.model,
      },
      proxy: config.proxy?.open ? config.proxy : undefined,
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

  getTitle = async (
    content: string,
    onProgress: (opts: { text: string }) => void
  ) => {
    await this.sendMessage(content, {
      systemMessage:
        '请为发给你的内容起一个12个字以内的简短标题，只需要返回标题文字即可。比如内容是：买手机看什么参数。则你可以回复：购机攻略',
      onProgress: ({ text }) => {
        text = text.trim()
        if (!text) return
        onProgress({
          text: text.replace(/['"”“《》]/g, '') || content.slice(0, 10),
        })
      },
    })
  }

  destory = () => {
    this.client = undefined
  }
})()

