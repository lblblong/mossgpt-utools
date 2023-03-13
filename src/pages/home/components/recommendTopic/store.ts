import { message } from 'antd'
import { makeAutoObservable } from 'mobx'
import { Template } from '../../../../models/template'
import { getRandomElements } from '../../../../shared/func/getRandomElements'
import { Storage } from '../../../../shared/storage'
import { homeStore } from '../../store'

export class Store {
  constructor() {
    this.refreshTopics()

    makeAutoObservable(this)
  }

  topics: Template[] = []

  currentTopic?: Template = undefined

  get text() {
    if (!this.currentTopic) return ''
    let template = this.currentTopic.template
    for (let i = 0; i < this.fields.length; i++) {
      const value = this.values[i]
      if (!value) continue
      const field = this.fields[i]
      template = template.replaceAll(field, value)
    }
    return template
  }

  get fields() {
    if (!this.currentTopic?.template) return []
    const fields = this.currentTopic?.template.match(/{(.*?)}/g)
    if (!fields) return []
    return fields.filter((field, index) => fields.indexOf(field) === index)
  }

  values: string[] = []

  setCurrentTopic = (topic?: Template) => {
    this.values = []
    this.currentTopic = topic
  }

  onSubmit = () => {
    if (!this.currentTopic) return

    try {
      for (let i = 0; i < this.fields.length; i++) {
        const value = this.values[i]
        if (!value) {
          throw Error(`请输入${this.fields[i]}`)
        }
      }
      homeStore.conversation?.sendMessage(this.text)
      this.setCurrentTopic()
    } catch (err: any) {
      message.error(err.message)
    }
  }

  refreshTopics = () => {
    this.topics = getRandomElements(
      Storage.getTemplates().filter((it) => it.recommendTopic),
      3
    )
  }
}

