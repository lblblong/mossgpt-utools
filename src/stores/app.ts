import { makeAutoObservable } from 'mobx'

export const appStore = new (class {
  constructor() {
    makeAutoObservable(this)
  }

  openApiKeyUrl = () => {
    utools.shellOpenExternal('https://platform.openai.com/account/api-keys')
  }
})()

