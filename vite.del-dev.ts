import fs from 'fs'

export function viteDelDev() {
  return {
    name: 'del-dev',
    writeBundle() {
      const filePath = './dist/plugin.json'
      const pluginConfig = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      delete pluginConfig.development
      fs.writeFileSync(filePath, JSON.stringify(pluginConfig))
    },
  }
}

