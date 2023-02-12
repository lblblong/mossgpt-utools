import { RouteObject } from 'oh-router'
import { Page } from '.'
import { navigate } from '../../router'

export const homeRoute: RouteObject = {
  path: '/',
  element: <Page />,
}

export function toHome() {
  navigate('/')
}

