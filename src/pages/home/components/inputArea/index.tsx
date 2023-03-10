import { Button, Space, message } from 'antd'
import { useState } from 'react'
import { homeStore } from '../../store'
import styles from './index.module.scss'

export const InputArea = () => {
  const [value, setValue] = useState('')
  const [isCompositionStarted, setIsCompositionStarted] = useState(false)

  const onSubmit = () => {
    try {
      if (value.trim() === '') return
      homeStore.conversation?.check()
      homeStore.conversation?.sendMessage(value)
      setValue('')
    } catch (err: any) {
      message.info(err.message)
    }
  }

  return (
    <div className={styles.index}>
      <textarea
        className={styles.input}
        value={value}
        onChange={({ target }) => {
          setValue(target.value)
        }}
        onCompositionStart={() => {
          setIsCompositionStarted(true)
        }}
        onKeyDown={(event) => {
          if (isCompositionStarted) {
            return
          }
          if (event.key === 'Enter') {
            if (event.ctrlKey || event.shiftKey) {
              setValue((value) => value + '\n')
            } else {
              event.preventDefault()
              onSubmit()
            }
          }
        }}
        onCompositionEnd={() => {
          setIsCompositionStarted(false)
        }}
      />
      <div className={styles.submitWrap}>
        <Space>
          <Button size="small" onClick={homeStore.onOpenTemplate}>
            消息模板
          </Button>
          <Button size="small" type="primary" onClick={onSubmit}>
            发送
          </Button>
        </Space>
      </div>
    </div>
  )
}

