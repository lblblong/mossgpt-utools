import { makeAutoObservable } from 'mobx';

export class Template {
  id?: string
  content: string

  constructor(opts: { id?: string; content: string }) {
    this.id = opts.id
    this.content = opts.content
    makeAutoObservable(this)
  }
}

