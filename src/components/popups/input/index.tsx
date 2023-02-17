import { Input as AntInput, Button } from 'antd'
import clsx from 'clsx'
import { useController } from 'oh-popup-react'
import { FC, useState } from 'react'
import { withObserver } from '../../../shared/func/withObserver'
import { popupManager } from '../../../shared/popupManager'
import { appStore } from '../../../stores/app'
import styles from './index.module.scss'

interface Props {
  title: string
  placeholder?: string
}

const Input: FC<Props> = ({ title, placeholder }) => {
  const ctl = useController()
  const [value, setValue] = useState('')

  return withObserver(() => (
    <div className={clsx(styles.index, appStore.isDark && styles.dark)}>
      <div>{title}</div>
      <AntInput
        placeholder={placeholder}
        value={value}
        onChange={({ target }) => setValue(target.value)}
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

