import { makeAutoObservable } from 'mobx'
import { openInput } from '../../components/popups/input'
import { openTemplatePopup } from '../../components/popups/template'
import { Conversation } from '../../models/conversation'
import { chatStore } from '../../stores/chat'

export const homeStore = new (class {
  constructor() {
    makeAutoObservable(this)

    utools.onPluginEnter(({ code, payload }) => {
      if (code !== 'text') return
      this.createConversation()
      this.conversation?.sendMessage(payload)
    })
  }

  conversation?: Conversation

  setConversation = (conversation: Conversation) => {
    this.conversation = conversation
    this.conversation.init()
  }

  createConversation = () => {
    const conversation = chatStore.createConversation()
    this.setConversation(conversation)
  }

  removeConversation = (conversation?: Conversation) => {
    if (!conversation) return
    if (this.conversation === conversation) {
      this.conversation = undefined
    }
    chatStore.removeConversation(conversation)
  }

  changeConversationTitle = async (conversation?: Conversation) => {
    if (!conversation) return
    const name = await openInput({ title: '请输入新的会话名称', defaultValue: conversation.name })
    if (!name) return
    conversation.name = name
    conversation.flushDb()
  }

  onOpenTemplate = async () => {
    const value = await openTemplatePopup()
    if (!value) return
    this.conversation?.sendMessage(value)
  }

  destory = () => {
    this.conversation = undefined
  }
})()

