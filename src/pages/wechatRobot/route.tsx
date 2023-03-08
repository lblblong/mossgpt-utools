import { Page } from '.'
import { navigate } from '../../router'

export const wechatRobotRoute = {
  path: '/wechatRobot',
  element: <Page />,
}

export function toWechatRobot() {
  navigate('/wechatRobot')
}

