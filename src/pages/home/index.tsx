import { Button } from 'antd'
import emptyImage from '../../assets/images/undraw_Online_messaging_re_qft3.png'
import { Chat } from '../../components/chat'
import { withObserver } from '../../shared/func/withObserver'
import { Conversations } from './components/conversations'
import { InputArea } from './components/inputArea'
import styles from './index.module.scss'
import { homeStore } from './store'

export function Page() {
  return withObserver(() => (
    <div className={styles.index}>
      <div className={styles.conversations}>
        <Conversations />
      </div>
      <div className={styles.main}>
        {homeStore.conversation ? (
          <>
            <div className={styles.top}>
              <Chat
                key={homeStore.conversation.id}
                messages={
                  homeStore.conversation.messages
                    .filter((it) => Boolean(it.text))
                    .map((it) => {
                      return {
                        text: it.text,
                        self: it.role === 'user',
                        createdAt: it.createdAt,
                        id: it.id,
                        state: it.state,
                      }
                    }) || []
                }
              />
            </div>
            <div className={styles.bottom}>
              <InputArea />
            </div>
          </>
        ) : (
          <div className={styles.empty}>
            <img src={emptyImage} alt="" />
            <div className={styles.tip}>请选择或创建一个新的会话</div>
            <Button
              type="primary"
              className={styles.action}
              onClick={homeStore.createConversation}
            >
              新的会话
            </Button>
          </div>
        )}
      </div>
    </div>
  ))
}

