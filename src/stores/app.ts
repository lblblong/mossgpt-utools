import { makeAutoObservable } from 'mobx'

export const appStore = new (class {
  theme: 'light' | 'dark' = 'light'

  get isDark() {
    return this.theme === 'dark'
  }

  constructor() {
    makeAutoObservable(this)
    if (utools.isDarkColors()) {
      this.setTheme('dark')
    } else {
      this.setTheme('light')
    }
  }

  openApiKeyUrl = () => {
    utools.shellOpenExternal('https://platform.openai.com/account/api-keys')
  }

  toggleTheme = () => {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark')
  }

  setTheme = (theme: 'light' | 'dark') => {
    this.theme = theme
    if (theme === 'dark') {
      document.body.classList.add('dartTheme')
    } else {
      document.body.classList.remove('dartTheme')
    }
  }
})()

