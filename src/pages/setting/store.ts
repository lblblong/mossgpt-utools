import { message, Modal } from 'antd'
import { makeAutoObservable } from 'mobx'
import { DefaultConfig } from '../../constance'
import { Storage } from '../../shared/storage'
import { chatStore } from '../../stores/chat'
import { chatgptStore } from '../../stores/chatgpt'
import { homeStore } from '../home/store'

export class Store {
  constructor() {
    makeAutoObservable(this)
    this.baseConfig = {
      ...Storage.getConfig(),
      apiKey: Storage.getApiKey(),
    }

    const convs = utools.db.allDocs('c-').map((it) => it._id)
    const msgs = utools.db.allDocs('m-').map((it) => it._id)
    this.storage = {
      convs,
      msgs,
    }
  }

  storage: {
    convs: string[]
    msgs: string[]
  } = {
    convs: [],
    msgs: [],
  }

  baseConfig: typeof DefaultConfig & {
    apiKey: string
  }

  saveBaseConfig = () => {
    Storage.setConfig({
      model: this.baseConfig.model,
      prompt: this.baseConfig.prompt,
    })
    Storage.setApiKey(this.baseConfig.apiKey)
    chatgptStore.reinit()
    message.success('成功')
  }

  clearStorage = async () => {
    const ids = [...this.storage.convs, ...this.storage.msgs]
    if (ids.length <= 0) return
    Modal.confirm({
      title: '提示',
      content: '这将清除所有的会话和消息，确定这么做吗？',
      onOk: () => {
        chatStore.destory()
        homeStore.destory()
        for (const id of ids) {
          utools.db.remove(id)
        }
        this.storage.convs = []
        this.storage.msgs = []
      },
    })
  }
}

