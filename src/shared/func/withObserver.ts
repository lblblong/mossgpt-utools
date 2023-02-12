import { Observer } from 'mobx-react-lite'
import React, { ReactNode } from 'react'

// 返回 Observer包裹的
export function withObserver(render: () => ReactNode) {
  return React.createElement(Observer, {}, render as any)
}
