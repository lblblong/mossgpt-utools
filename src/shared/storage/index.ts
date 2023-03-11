import { DefaultConfig, DefaultTemplates, dataVersion } from '../../constance'
import { Conversation } from '../../models/conversation'
import { Message } from '../../models/message'
import { Template } from '../../models/template'
import { IConfig } from '../../types'

export class Storage {
  static getApiKey() {
    return utools.dbStorage.getItem('apiKey')
  }

  static setApiKey(key: string) {
    return utools.dbStorage.setItem('apiKey', key)
  }

  static setConversation(it: Conversation) {
    utools.dbStorage.setItem(`c-${it.id}`, {
      id: it.id,
      name: it.name,
      createdAt: it.createdAt,
    })
  }

  static getConversations() {
    const conversations = utools.db.allDocs(`c-`)
    return conversations
      .map(({ value }: any) => {
        return new Conversation(value)
      })
      .sort((a, b) => {
        return a.createdAt < b.createdAt ? 1 : -1
      })
  }

  static removeConversation(id: string) {
    utools.dbStorage.removeItem(`c-${id}`)
  }

  static getMessage(id: string) {
    return new Message(utools.dbStorage.getItem(`m-${id}`))
  }

  static setMessage(it: Message) {
    utools.dbStorage.setItem(`m-${it.id}`, {
      id: it.id,
      text: it.text,
      createdAt: it.createdAt,
      role: it.role,
      state: it.state,
      parentMessageId: it.parentMessageId,
      conversationId: it.conversationId,
      failedReason: it.failedReason,
    })
  }

  static getMessagesByConversationId(id: string) {
    return utools.db.allDocs(`m-${id}`).map(({ value }) => new Message(value))
  }

  static removeMessagesByConversationId(id: string) {
    const ids = utools.db.allDocs(`m-${id}`).map((it) => it._id)
    for (const id of ids) {
      utools.db.remove(id)
    }
  }

  static removeMessage(id: string) {
    utools.dbStorage.removeItem(`m-${id}`)
  }

  static getConfig(): IConfig {
    return Object.assign({}, DefaultConfig, utools.dbStorage.getItem('config'))
  }

  static setConfig(config: IConfig) {
    utools.dbStorage.setItem('config', config)
  }

  static removeConfig() {
    utools.dbStorage.removeItem('config')
  }

  static getTemplates() {
    let templates = utools.db.allDocs('t-').map((it) => it.value)
    if (templates.length === 0) {
      templates = DefaultTemplates.map((it, i) => ({
        id: Date.now() + '' + i,
        content: it,
      }))
      for (const it of templates) {
        this.setTemplate(new Template(it))
      }
    }
    return templates.map((it) => new Template(it))
  }

  static getTemplate(id: string) {
    const it = utools.dbStorage.getItem(`t-${id}`)
    return new Template(it)
  }

  static setTemplate(it: Template) {
    utools.dbStorage.setItem(`t-${it.id}`, {
      id: it.id,
      content: it.content,
    })
  }

  static removeTemplate(id: string) {
    utools.dbStorage.removeItem(`t-${id}`)
  }

  static getLastDataVersion() {
    const lastDataVersion = utools.dbStorage.getItem('dataVersion')
    if (lastDataVersion === null || lastDataVersion === undefined) {
      this.setLastDataVersion(dataVersion)
      return -1
    }
    return lastDataVersion
  }

  static setLastDataVersion(version: number) {
    utools.dbStorage.setItem('dataVersion', version)
  }

  static setTheme(theme: string) {
    utools.dbStorage.setItem('theme', theme)
  }

  static getTheme() {
    const theme = utools.dbStorage.getItem('theme')
    if (theme) return theme
    else return utools.isDarkColors() ? 'dark' : 'light'
  }

  static removeTheme() {
    utools.dbStorage.removeItem('theme')
  }
}

