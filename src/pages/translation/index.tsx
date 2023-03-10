import { ArrowRightOutlined, RetweetOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import clsx from 'clsx'
import { withObserver } from '../../shared/func/withObserver'
import { appStore } from '../../stores/app'
import styles from './index.module.scss'
import { translationStore } from './store'

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
          <span className={styles.icon}>
            <ArrowRightOutlined />
          </span>
          {translationStore.config.targetLang}
        </div>
        <Button icon={<RetweetOutlined />} onClick={translationStore.reverse}>
          翻转
        </Button>
      </div>

      <div className={styles.targetBox}>
        <div
          dangerouslySetInnerHTML={{
            __html: translationStore.target.replaceAll('\n', '<br/>'),
          }}
        ></div>
        {translationStore.err && (
          <div className={styles.err}>{translationStore.err.message}</div>
        )}
      </div>
    </div>
  ))
}

