import { Button, Input as AntInput } from 'antd'
import { useController } from 'oh-popup-react'
import { FC, useState } from 'react'
import { withObserver } from '../../../shared/func/withObserver'
import { popupManager } from '../../../shared/popupManager'
import styles from './index.module.scss'

interface Props {
  title: string
  placeholder?: string
  defaultValue?: string
}

const Input: FC<Props> = ({ title, placeholder, defaultValue }) => {
  const ctl = useController()
  const [value, setValue] = useState(defaultValue || '')

  return withObserver(() => (
    <div className={styles.index}>
      <div>{title}</div>
      <AntInput
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        onPressEnter={() => ctl.close(value)}
        autoFocus
        allowClear
      />
      <div className={styles.actions}>
        <Button onClick={() => ctl.onlyClose()}>取消</Button>
        <Button
          className={styles.submit}
          type="primary"
          onClick={() => ctl.close(value)}
        >
          确定
        </Button>
      </div>
    </div>
  ))
}

export function openInput(props: Props) {
  return popupManager.open({
    el: <Input {...props} />,
    position: 'center',
  })
}

