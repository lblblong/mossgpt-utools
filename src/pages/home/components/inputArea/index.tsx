import { Button, Space } from 'antd'
import { withObserver } from '../../../../shared/func/withObserver'
import { homeStore } from '../../store'
import styles from './index.module.scss'

export const InputArea = () => {
  const store = homeStore.stores.input

  return withObserver(() => (
    <div className={styles.index}>
      <textarea
        className={styles.input}
        value={store.value}
        onChange={({ target }) => (store.value = target.value)}
        onCompositionStart={() => (store.isCompositionStarted = true)}
        onCompositionEnd={() => (store.isCompositionStarted = false)}
        onKeyDown={(event) => {
          if (store.isCompositionStarted) {
            return
          }
          if (event.key === 'Enter') {
            if (event.ctrlKey || event.shiftKey) {
              store.value += '\n'
            } else {
              event.preventDefault()
              store.onSubmit()
            }
          }
        }}
      />
      <div className={styles.submitWrap}>
        <Space>
          <Button size="small" onClick={homeStore.onOpenTemplate}>
            消息模板
          </Button>
          <Button size="small" type="primary" onClick={store.onSubmit}>
            发送
          </Button>
        </Space>
      </div>
    </div>
  ))
}

