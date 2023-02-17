import { Button, Card, Space } from 'antd'
import { useController } from 'oh-popup-react'
import { FC, useMemo, useState } from 'react'
import { popupManager } from '../../../shared/popupManager'
import { Storage } from '../../../shared/storage'
import styles from './index.module.scss'
import { withObserver } from '../../../shared/func/withObserver'
import clsx from 'clsx'
import { appStore } from '../../../stores/app'

interface Props {}

const TemplatePopup: FC<Props> = () => {
  const ctl = useController()
  const templates = useMemo(() => Storage.getTemplates(), [])
  const [value, setValue] = useState<string | undefined>()

  return withObserver(() => (
    <div className={clsx(styles.index, appStore.isDark && styles.dark)}>
      {value ? (
        <div className={styles.edit}>
          <textarea
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />
          <div className={styles.actions}>
            <Space>
              <Button onClick={() => ctl.onlyClose()}>取消</Button>
              <Button
                className={styles.submit}
                type="primary"
                onClick={() => ctl.close(value)}
              >
                确定
              </Button>
            </Space>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.templates}>
            {templates.map((it, i) => {
              return (
                <Card
                  key={i}
                  className={styles.item}
                  size="small"
                  hoverable
                  onClick={() => setValue(it.content)}
                >
                  {it.content}
                </Card>
              )
            })}
          </div>
        </>
      )}
    </div>
  ))
}

export function openTemplatePopup(props?: Props) {
  return popupManager.open({
    el: <TemplatePopup {...props} />,
    position: 'center',
  })
}

