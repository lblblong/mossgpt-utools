import { makeAutoObservable } from 'mobx'
import { Storage } from '../shared/storage'

export const appStore = new (class {
  theme: 'light' | 'dark' = 'light'

  get isDark() {
    return this.theme === 'dark'
  }

  constructor() {
    makeAutoObservable(this)
    this.setTheme(Storage.getTheme())
  }

  openApiKeyUrl = () => {
    utools.shellOpenExternal('https://platform.openai.com/account/api-keys')
  }

  openShareUrl = () => {
    utools.shellOpenExternal(
      'https://github.com/lblblong/mossgpt-utools/issues/4'
    )
  }

  setTheme = (theme: 'light' | 'dark' | 'auto') => {
    if (theme === 'auto') {
      Storage.removeTheme()
      theme = utools.isDarkColors() ? 'dark' : 'light'
    } else {
      Storage.setTheme(theme)
    }

    this.theme = theme
    if (theme === 'dark') {
      document.body.classList.add('dartTheme')
    } else {
      document.body.classList.remove('dartTheme')
    }
  }
})()

