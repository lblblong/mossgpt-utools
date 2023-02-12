import { DefaultConfig, DefaultTemplates } from '../../constance'
import { Conversation } from '../../models/conversation'
import { Message } from '../../models/message'
import { Template } from '../../models/template'

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
      messageIds: it.messages.map((m) => m.id),
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

  static setMessage(it: Message) {
    utools.dbStorage.setItem(`m-${it.id}`, {
      id: it.id,
      text: it.text,
      createdAt: it.createdAt,
      role: it.role,
      state: it.state,
      parentMessageId: it.parentMessageId,
      conversationId: it.conversationId,
    })
  }

  static getMessagesByConversationId(id: string) {
    const { messageIds } = utools.dbStorage.getItem(`c-${id}`)
    return utools.db
      .allDocs(messageIds.map((id: string) => `m-${id}`) as any)
      .map(({ value }) => new Message(value))
  }

  static removeMessage(id: string) {
    utools.dbStorage.removeItem(`m-${id}`)
  }

  static getConfig(): typeof DefaultConfig {
    return Object.assign({}, DefaultConfig, utools.dbStorage.getItem('config'))
  }

  static setConfig(config: typeof DefaultConfig) {
    utools.dbStorage.setItem('config', config)
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
}

