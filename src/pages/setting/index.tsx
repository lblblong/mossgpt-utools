import { withStore } from '@libeilong/react-store-provider'
import { BasicSetting } from './basic'
import styles from './index.module.scss'
import { OtherSetting } from './other'
import { ProxySetting } from './proxy'
import { Store } from './store'

function _Page() {
  return (
    <div className={styles.index}>
      <h2>设置</h2>
      <div className={styles.title}>基本配置</div>
      <div className={styles.box}>
        <BasicSetting />
      </div>

      <div className={styles.title}>代理</div>
      <div className={styles.box}>
        <ProxySetting />
      </div>

      <div className={styles.title}>其他</div>
      <div className={styles.box}>
        <OtherSetting />
      </div>
    </div>
  )
}

export const Page = withStore(_Page, Store)

