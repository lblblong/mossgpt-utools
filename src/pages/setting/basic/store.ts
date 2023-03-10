import { makeAutoObservable } from 'mobx'

let time: NodeJS.Timer

export class Store {
  constructor() {
    clearInterval(time)
    makeAutoObservable(this)
    time = setInterval(() => {
      this.currentLink = this.currentLink === 1 ? 0 : 1
    }, 3000)
  }

  currentLink = 0

}

