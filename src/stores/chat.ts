import { makeAutoObservable } from 'mobx'
import { Conversation } from '../models/conversation'
import { Storage } from '../shared/storage'

export const chatStore = new (class {
  constructor() {
    makeAutoObservable(this)
  }

  private initialized = false

  init = () => {
    if (this.initialized) return
    this.conversations = Storage.getConversations()
    this.initialized = true
  }

  conversations: Conversation[] = []

  createConversation = () => {
    const conversation = new Conversation().flushDb()
    this.conversations.unshift(conversation)
    return conversation
  }

  removeConversation = (conversation: Conversation) => {
    this.conversations.splice(this.conversations.indexOf(conversation), 1)
    Storage.removeConversation(conversation.id)
    Storage.removeMessagesByConversationId(conversation.id)
  }

  destory = () => {
    this.initialized = false
    this.conversations = []
  }
})()

