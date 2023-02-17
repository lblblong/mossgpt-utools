import clsx from 'clsx'
import { useRef } from 'react'
import { Item, Menu, useContextMenu } from 'react-contexify'
import 'react-contexify/ReactContexify.css'
import { Conversation } from '../../../../models/conversation'
import { withObserver } from '../../../../shared/func/withObserver'
import { chatStore } from '../../../../stores/chat'
import { homeStore } from '../../store'
import styles from './index.module.scss'
import { appStore } from '../../../../stores/app'

export const Conversations = () => {
  const conversationRef = useRef<Conversation>()
  const { show } = useContextMenu({
    id: 'conversationMenu',
  })

  return withObserver(() => (
    <div className={styles.index}>
      <div className={styles.item} onClick={homeStore.createConversation}>
        + 新建会话
      </div>
      <div className={styles.list}>
        {chatStore.conversations.map((it) => {
          return (
            <div
              className={clsx(
                styles.item,
                it === homeStore.conversation && styles.active
              )}
              onClick={() => homeStore.setConversation(it)}
              onContextMenu={(event) => {
                conversationRef.current = it
                show({ event })
              }}
            >
              <span>{it.name}</span>
            </div>
          )
        })}
      </div>

      <Menu id="conversationMenu" theme={appStore.isDark ? 'dark' : 'light'}>
        <Item
          onClick={() => homeStore.removeConversation(conversationRef.current)}
        >
          删除会话
        </Item>
        <Item
          onClick={() =>
            homeStore.changeConversationTitle(conversationRef.current)
          }
        >
          修改会话名称
        </Item>
      </Menu>
    </div>
  ))
}

