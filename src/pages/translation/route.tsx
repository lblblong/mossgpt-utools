import { Page } from '.'
import { navigate, Options } from '../../router'

export type IQuery = {
  text?: string
}

export const translationRoute = {
  path: '/translation',
  element: <Page />,
}

export function toTranslation(opts?: Options<IQuery>) {
  navigate('/translation', opts)
}

