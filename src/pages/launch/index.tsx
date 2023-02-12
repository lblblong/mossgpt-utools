import { useStore, withStore } from '@libeilong/react-store-provider'
import { Button, Input } from 'antd'
import logo from '../../assets/images/logo.png'
import { withObserver } from '../../shared/func/withObserver'
import { appStore } from '../../stores/app'
import styles from './index.module.scss'
import { Store } from './store'

function _Page() {
  const store = useStore<Store>()

  return withObserver(() => (
    <div className={styles.index}>
      <div className={styles.main}>
        <img className={styles.logo} src={logo} alt="" />
        <div className={styles.form}>
          <Input
            value={store.key}
            onChange={({ target }) => (store.key = target.value)}
            placeholder="请输入 API_KEY"
          ></Input>
          <Button type="primary" onClick={store.submit}>
            立即进入
          </Button>
        </div>
      </div>
      <div className={styles.footer}>
        <Button type="link" onClick={appStore.openApiKeyUrl}>
          获取 API_KEY？
        </Button>
      </div>
    </div>
  ))
}

export const Page = withStore(_Page, Store)

