import { makeAutoObservable } from 'mobx';

export class Template {
  id?: string
  title: string
  template: string
  recommendTopic?: boolean

  constructor(opts: Template) {
    this.id = opts.id
    this.title = opts.title
    this.template = opts.template
    this.recommendTopic = opts.recommendTopic
    makeAutoObservable(this)
  }
}

