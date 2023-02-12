import { Page } from '.'
import { navigate } from '../../router'

export const launchRoute = {
  path: '/launch',
  element: <Page />,
}

export function toLaunch() {
  navigate('/launch')
}

