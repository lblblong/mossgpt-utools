import { makeAutoObservable } from 'mobx'
import { chatgptStore } from '../../stores/chatgpt'

export const translationStore = new (class {
  constructor() {
    makeAutoObservable(this)
  }

  get config() {
    if (/[\u4e00-\u9fa5]/.test(this.source)) {
      return {
        targetLang: '英语',
        sourceLang: '中文'
      }
    } else {
      return {
        targetLang: '中文',
        sourceLang: '英语'
      }
    }
  }

  source = ''
  target = ''

  timer?: NodeJS.Timeout

  onSourceChange = (text: string) => {
    this.source = text
    clearTimeout(this.timer)
    this.timer = setTimeout(this.start, 600)
  }

  start = () => {
    if (this.source.trim() === '') return
    const { targetLang } = this.config
    chatgptStore.sendMessage(`下面我让你来充当翻译家，你的目标是把任何语言翻译成${targetLang}，请翻译时不要带翻译腔，而是要翻译得自然、流畅和地道，使用优美和高雅的表达方式。请翻译下面的内容：\n${this.source}`, {
      onProgress: ({ text }) => {
        this.target = text
      }
    })
  }

  reverse = () => {
    if (this.target.trim() === '') return
    this.onSourceChange(this.target)
    this.target = ''
  }
})()
