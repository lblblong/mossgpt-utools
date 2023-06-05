import { message } from 'antd'
import { dataVersion } from '../../constance'
import { Storage } from '../storage'
import updateTo3 from './3'
import updateTo4 from './4'

// 更新不能依赖于其他模块，因为其他模块可能会因为更新而发生变化
const updates = [updateTo3, updateTo4]

export function update() {
  try {
    const lastDataVersion = Storage.getLastDataVersion()
    if (lastDataVersion >= dataVersion) return
    const start = updates.findIndex((item) => item.from === lastDataVersion)
    if (start === -1) return
    updates.slice(start).forEach((item) => item.handle())
  } catch (err: any) {
    Storage.remove()
    message.error(err.message)
    message.error(
      '应用升级的过程中出现了问题，已经将应用的数据清空，请重新配置。'
    )
  } finally {
    Storage.setLastDataVersion(dataVersion)
  }
}

