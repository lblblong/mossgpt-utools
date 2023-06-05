import { Storage } from '../storage'

export default {
  from: 3,
  to: 4,
  handle() {
    try {
      const config = Storage.getConfig()
      if (config.apiBaseUrl === 'https://closeai.deno.dev/v1') {
        Storage.setConfig({
          ...config,
          apiBaseUrl: 'https://cold-crow-90.deno.dev/v1',
        })
      }
    } catch (err) {}
  },
}

