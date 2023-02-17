import { ArrowLeftOutlined } from '@ant-design/icons'
import { useStore, withStore } from '@libeilong/react-store-provider'
import { Button, Space } from 'antd'
import { useEffect } from 'react'
import { router } from '../../router'
import { withObserver } from '../../shared/func/withObserver'
import { useQuery } from '../../shared/hooks/useQuery'
import styles from './index.module.scss'
import { IQuery } from './route'
import { Store } from './store'
import clsx from 'clsx'
import { appStore } from '../../stores/app'

function _Page() {
  const store = useStore<Store>()
  const query = useQuery<IQuery>()
  useEffect(() => {
    store.onQueryChange(query)
  }, [query, store])

  return withObserver(() => (
    <div className={clsx(styles.index, appStore.isDark && styles.dark)}>
      <h2 className={styles.title} onClick={() => router.back()}>
        <ArrowLeftOutlined /> 返回
      </h2>
      <textarea
        value={store.template.content}
        onChange={({ target }) => (store.template.content = target.value)}
      />
      <div className={styles.actions}>
        <Space>
          {store.template.id && (
            <Button danger onClick={store.onDel}>
              删除
            </Button>
          )}
          <Button type="primary" onClick={store.onSubmit}>
            保存
          </Button>
        </Space>
      </div>
    </div>
  ))
}

export const Page = withStore(_Page, Store)

