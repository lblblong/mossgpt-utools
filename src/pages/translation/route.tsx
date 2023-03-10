import { Page } from '.'
import { Options, navigate } from '../../router'
import { translationStore } from './store'

export type IQuery = {
  text?: string
}

export const translationRoute = {
  path: '/translation',
  element: <Page />,
}

export function toTranslation(opts?: Options<IQuery>) {
  if (opts?.query?.text) {
    translationStore.onSourceChange(opts.query.text)
  }
  navigate('/translation')
}

