import { Modal } from 'antd'
import { makeAutoObservable } from 'mobx'
import { Storage } from '../../../shared/storage'
import { chatStore } from '../../../stores/chat'
import { homeStore } from '../../home/store'

export class Store {
  constructor() {
    makeAutoObservable(this)

    const convs = utools.db.allDocs('c-').map((it) => it._id)
    const msgs = utools.db.allDocs('m-').map((it) => it._id)
    this.storage = {
      convs,
      msgs,
    }

    this.autoTitle = Storage.getAotuTitle()
  }

  autoTitle: boolean

  setAutoTitle = (value: boolean) => {
    this.autoTitle = value
    Storage.setAotuTitle(value)
  }

  storage: {
    convs: string[]
    msgs: string[]
  } = {
    convs: [],
    msgs: [],
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

