import { Button } from 'antd'
import clsx from 'clsx'
import { useCallback, useEffect, useRef } from 'react'
import emptyImage from '../../assets/images/undraw_Online_messaging_re_qft3.png'
import { Chat } from '../../components/chat'
import { withObserver } from '../../shared/func/withObserver'
import { useQuery } from '../../shared/hooks/useQuery'
import { appStore } from '../../stores/app'
import { Conversations } from './components/conversations'
import { InputArea } from './components/inputArea'
import { RecommendTopic } from './components/recommendTopic'
import styles from './index.module.scss'
import { IQuery } from './route'
import { homeStore } from './store'

export function Page() {
  const downingRef = useRef<boolean>(false)
  const lastEventRef = useRef<MouseEvent>()
  const query = useQuery<IQuery>()

  useEffect(() => {
    homeStore.stores.recommendTopic.refreshTopics()
  }, [])

  useEffect(() => {
    if (query.text) {
      homeStore.createConversation()
      homeStore.conversation?.sendMessage(query.text)
    }
  }, [query])

  const onMove = useCallback((event: MouseEvent) => {
    if (!downingRef.current) return
    homeStore.inputAreaHeight += lastEventRef.current!.y - event.y
    lastEventRef.current = event
  }, [])

  const onMouseDown = useCallback((event: MouseEvent) => {
    lastEventRef.current = event
    document.body.classList.add('unselectable')
    downingRef.current = true
  }, [])

  const onMouseUp = useCallback((event: MouseEvent) => {
    document.body.classList.remove('unselectable')
    downingRef.current = false
  }, [])

  return withObserver(() => (
    <div className={clsx(styles.index, appStore.isDark && styles.dark)}>
      <div className={styles.conversations}>
        <Conversations />
      </div>
      <div
        className={styles.main}
        onMouseMove={(e) => onMove(e.nativeEvent)}
        onMouseUp={(e) => onMouseUp(e.nativeEvent)}
      >
        {homeStore.conversation ? (
          <>
            <div className={styles.top}>
              <Chat
                key={homeStore.conversation.id}
                messages={homeStore.conversation.messages.map((it) => {
                  return {
                    id: it.id,
                    self: it.self,
                    state: it.state,
                    text: it.text,
                    createdAt: it.createdAt,
                    failedReason: it.failedReason,
                  }
                })}
                onRetry={homeStore.conversation.resendMessage}
              />
              {homeStore.conversation.messages.length === 0 &&
                homeStore.stores.recommendTopic.topics.length > 0 && (
                  <div className={styles.recommendTopic}>
                    <RecommendTopic />
                  </div>
                )}
            </div>
            <div
              className={styles.bottom}
              style={{
                height: homeStore.inputAreaHeight,
              }}
            >
              <InputArea />
              <div
                onMouseDown={(e) => onMouseDown(e.nativeEvent)}
                className={styles.dragLine}
              ></div>
            </div>
          </>
        ) : (
          <div className={styles.empty}>
            <img src={emptyImage} alt="" />
            <div className={styles.tip}>????????????????????????????????????</div>
            <Button
              type="primary"
              className={styles.action}
              onClick={homeStore.createConversation}
            >
              ????????????
            </Button>
          </div>
        )}
      </div>
    </div>
  ))
}

