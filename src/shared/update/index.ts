import { dataVersion } from '../../constance'
import { Storage } from '../storage'

export function update() {
  const lastDataVersion = Storage.getLastDataVersion()
  if (lastDataVersion === dataVersion) return

  Storage.removeConfig()
}

