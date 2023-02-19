import mitt from 'mitt'

type Events = {}

export const globalEvent = mitt<Events>()

