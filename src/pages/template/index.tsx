import { useStore, withStore } from '@libeilong/react-store-provider'
import { Button, Card } from 'antd'
import { withObserver } from '../../shared/func/withObserver'
import styles from './index.module.scss'
import { Store } from './store'

function _Page() {
  const store = useStore<Store>()

  return withObserver(() => (
    <div className={styles.index}>
      <h2>模板配置</h2>
      {store.templates.map((it, i) => {
        return (
          <Card
            key={i}
            className={styles.item}
            size="small"
            hoverable
            onClick={() => store.onEdit(it)}
          >
            {it.content}
          </Card>
        )
      })}
      <div className={styles.action}>
        <Button type="primary" onClick={store.onCreate}>
          添加模板
        </Button>
      </div>
    </div>
  ))
}

export const Page = withStore(_Page, Store)

