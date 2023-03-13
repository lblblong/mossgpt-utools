import { ArrowLeftOutlined } from '@ant-design/icons'
import { useStore, withStore } from '@libeilong/react-store-provider'
import { Button, Checkbox, Input, Space } from 'antd'
import clsx from 'clsx'
import { useEffect } from 'react'
import { router } from '../../router'
import { withObserver } from '../../shared/func/withObserver'
import { useQuery } from '../../shared/hooks/useQuery'
import { appStore } from '../../stores/app'
import styles from './index.module.scss'
import { IQuery } from './route'
import { Store } from './store'

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
      <Space direction="vertical">
        <Input
          placeholder="请输入模板标题"
          value={store.template.title}
          onChange={({ target }) => (store.template.title = target.value)}
        />
        <Input.TextArea
          placeholder="请输入模板内容"
          autoSize={{ minRows: 5 }}
          value={store.template.template}
          onChange={({ target }) => (store.template.template = target.value)}
        />
        <Checkbox
          checked={store.template.recommendTopic}
          onChange={({ target }) =>
            (store.template.recommendTopic = target.checked)
          }
        >
          作为推荐话题展示在会话页
        </Checkbox>
      </Space>
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

