import { RetweetOutlined } from '@ant-design/icons'
import { withStore } from '@libeilong/react-store-provider'
import { Button, Input, Space } from 'antd'
import 'react-contexify/ReactContexify.css'
import { withObserver } from '../../../../shared/func/withObserver'
import { homeStore } from '../../store'
import styles from './index.module.scss'
import { Store } from './store'

const _RecommendTopic = () => {
  const store = homeStore.stores.recommendTopic
  return withObserver(() => (
    <div className={styles.index}>
      <div className={styles.header}>
        {store.currentTopic?.title || '推荐话题'}
      </div>
      {store.currentTopic ? (
        <div className={styles.form}>
          <div className={styles.content}>{store.text}</div>

          {store.fields.map((it, i) => {
            return (
              <Input.TextArea
                key={i}
                autoSize={{ minRows: 1, maxRows: 5 }}
                placeholder={it}
                value={store.values[i]}
                onChange={({ target }) => (store.values[i] = target.value)}
              />
            )
          })}
        </div>
      ) : (
        <div className={styles.topics}>
          {store.topics.map((it, i) => {
            return (
              <div
                key={i}
                className={styles.item}
                onClick={() => store.setCurrentTopic(it)}
              >
                <div className={styles.title}>{it.title}</div>
                <div className={styles.template}>{it.template}</div>
              </div>
            )
          })}
        </div>
      )}
      <div className={styles.footer}>
        {store.currentTopic ? (
          <Space>
            <Button type="primary" onClick={store.onSubmit}>
              立即开始
            </Button>
            <Button type="link" danger onClick={() => store.setCurrentTopic()}>
              取消
            </Button>
          </Space>
        ) : (
          <Button icon={<RetweetOutlined />} onClick={store.refreshTopics}>
            换一批
          </Button>
        )}
      </div>
    </div>
  ))
}

export const RecommendTopic = withStore(_RecommendTopic, Store)

