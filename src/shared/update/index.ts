import { message } from 'antd'
import { dataVersion, DefaultTemplates } from '../../constance'
import { Template } from '../../models/template'
import { Storage } from '../storage'

function updateTemplates(lastDataVersion: number) {
  if (lastDataVersion > 1) return
  let templates = utools.db.allDocs('t-').map((it) => it.value)
  if (templates.length === 0) return
  for (let i = 0; i < templates.length; i++) {
    const t = templates[i]
    Storage.setTemplate(
      new Template({
        id: t.id,
        title: t.content.slice(0, 12),
        template: t.content,
      })
    )
  }
  for (let i = 0; i < DefaultTemplates.length; i++) {
    Storage.setTemplate(
      new Template({
        id: Date.now() + '' + i,
        ...DefaultTemplates[i],
      })
    )
  }
}

export function update() {
  try {
    const lastDataVersion = Storage.getLastDataVersion()
    if (lastDataVersion === dataVersion) return
    updateTemplates(lastDataVersion)
    Storage.removeConfig()
  } catch (err: any) {
    message.error(err.message)
  } finally {
    Storage.setLastDataVersion(dataVersion)
  }
}

