import { useStore, withStore } from '@libeilong/react-store-provider'
import { withObserver } from '../../shared/func/withObserver'
import styles from './index.module.scss'
import { Store } from './store'

function _WechatRobot() {
  const store = useStore<Store>()

  return withObserver(() => (
    <div className={styles.index}>此模块正在施工中...</div>
  ))
}

export const WechatRobot = withStore(_WechatRobot, Store)

