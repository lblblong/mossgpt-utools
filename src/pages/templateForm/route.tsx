import { Page } from '.'
import { Options, navigate } from '../../router'

export type IQuery = {
  id: string
}

export const templateFormRoute = {
  path: '/templateForm',
  element: <Page />,
}

export function toTemplateForm(opts?: Options<IQuery>) {
  navigate('/templateForm', opts)
}

