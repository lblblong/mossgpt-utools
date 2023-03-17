import { ChatGPTAPI, SendMessageOptions } from '@libeilong/chatgpt'
import { objectPick } from '@libeilong/func'
import { makeAutoObservable } from 'mobx'
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
    const apiBaseUrl = Storage.getApiBaseUrl()
    const config = Storage.getConfig()

    const completionParams = objectPick(config, [
      'temperature',
      'top_p',
      'presence_penalty',
      'frequency_penalty',
    ])

    this.client = window.preload.getChatGPTClient({
      apiKey,
      apiBaseUrl,
      completionParams: {
        model: config.model,
        ...completionParams,
      },
      maxModelTokens: config.max_tokens,
      proxy: config.proxy?.open ? config.proxy : undefined,
      getMessageById: async (id: string) => Storage.getMessage(id),
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
    const autoTitle = Storage.getAotuTitle()
    if (!autoTitle) {
      onProgress({ text: content.slice(0, 12) })
      return
    }

    await this.sendMessage(
      `我想让你为我写的内容起一个12个字以内的简短标题，你只需要返回标题文字，不要包含其他信息，比如内容是：“买手机看什么参数”。则你可以回复：“购机攻略”。请为这段内容起一个标题：“${content}”`,
      {
        onProgress: ({ text }) => {
          text = text.trim()
          if (!text) return
          onProgress({
            text: text.replace(/['"”“《》]/g, '') || content.slice(0, 10),
          })
        },
      }
    )
  }

  destory = () => {
    this.client = undefined
  }
})()

