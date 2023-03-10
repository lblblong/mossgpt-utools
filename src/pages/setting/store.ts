import { message } from 'antd'
import { makeAutoObservable, toJS } from 'mobx'
import { Storage } from '../../shared/storage'
import { chatgptStore } from '../../stores/chatgpt'
import { IConfig } from '../../types'
import { Store as BasicStore } from './basic/store'
import { Store as OtherStore } from './other/store'

export class Store {
  stores = {
    basic: new BasicStore(),
    other: new OtherStore()
  }

  constructor() {
    makeAutoObservable(this)
    this.baseConfig = {
      ...Storage.getConfig(),
      apiKey: Storage.getApiKey(),
    }
  }

  baseConfig: IConfig & {
    apiKey: string
  }

  saveBaseConfig = () => {
    Storage.setConfig({
      model: this.baseConfig.model,
      prompt: this.baseConfig.prompt,
      proxy: toJS(this.baseConfig.proxy),
    })
    Storage.setApiKey(this.baseConfig.apiKey)
    chatgptStore.reinit()
    message.success('成功')
  }
}

