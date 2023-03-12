/// <reference types="vite/client" />

declare module 'uTools' {
  import Utools from 'utools-api-types'
  export = Utools
}

declare interface Window {
  preload: {
    getChatGPTClient: (
      opts: ChatGPTAPIOptions & {
        proxy?: {
          host?: string
          port?: string | number
        }
      }
    ) => ChatGPTAPI
  }
}

