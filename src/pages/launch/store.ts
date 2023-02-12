import { makeAutoObservable } from 'mobx'
import { Storage } from '../../shared/storage'
import { toHome } from '../home/route'

export class Store {
  key = ''

  constructor() {
    makeAutoObservable(this)
    this.key = Storage.getApiKey()
  }

  submit = async () => {
    if (!this.key) return
    Storage.setApiKey(this.key)
    toHome()
  }
}

