import { Page } from '.'
import { navigate } from '../../router'

export const templateRoute = {
  path: '/template',
  element: <Page />,
}

export function toTemplate() {
  navigate('/template')
}

