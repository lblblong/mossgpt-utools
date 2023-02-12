import { Page } from '.'
import { navigate } from '../../router'

export const settingRoute = {
  path: '/setting',
  element: <Page />,
}

export function toSetting() {
  navigate('/setting')
}

