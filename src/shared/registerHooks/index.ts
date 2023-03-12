import { toHome } from '../../pages/home/route'
import { toTranslation } from '../../pages/translation/route'

export function registerHooks() {
  utools.onPluginEnter(({ code, payload }) => {
    if (code === 'text') {
      toHome({ query: { text: payload } })
    } else if (code === 'translation') {
      toTranslation({ query: { text: payload } })
    }
  })
}

