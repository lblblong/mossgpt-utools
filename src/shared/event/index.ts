import mitt from 'mitt'

type Events = {
  login: undefined
  logout: undefined
  persistedMessage: string
}

export const globalEvent = mitt<Events>()

