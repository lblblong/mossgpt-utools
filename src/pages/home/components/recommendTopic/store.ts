import { message } from 'antd'
import { makeAutoObservable } from 'mobx'
import { TopicList } from '../../../../constance'
import { getRandomElements } from '../../../../shared/func/getRandomElements'
import { homeStore } from '../../store'

export class Store {
  constructor() {
    makeAutoObservable(this)
  }

  topics = getRandomElements(TopicList, 3)

  currentTopic?: typeof TopicList[0] = undefined

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

  setCurrentTopic = (topic?: typeof TopicList[0]) => {
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
    this.topics = getRandomElements(TopicList, 3)
  }
}

