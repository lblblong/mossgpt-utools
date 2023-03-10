import { withObserver } from '../../shared/func/withObserver'
import styles from './index.module.scss'
import { translationStore } from './store'
import clsx from 'clsx'
import { appStore } from '../../stores/app'
import { Button } from 'antd'
import { ArrowRightOutlined, RetweetOutlined } from '@ant-design/icons'

export function Page() {
  return withObserver(() => (
    <div className={clsx(styles.index, appStore.isDark && styles.dark)}>
      <div className={styles.sourceBox}>
        <textarea
          value={translationStore.source}
          onChange={({ target }) =>
            translationStore.onSourceChange(target.value)
          }
          placeholder="请输入要翻译的内容"
        />
      </div>

      <div className={styles.toolbarBox}>
        <div>
          {translationStore.config.sourceLang}
          <ArrowRightOutlined />
          {translationStore.config.targetLang}
        </div>
        <Button icon={<RetweetOutlined />} onClick={translationStore.reverse}>翻转</Button>
      </div>

      <div className={styles.targetBox}>
        <div>{translationStore.target}</div>
      </div>
    </div>
  ))
}

