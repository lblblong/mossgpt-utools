import { PlusCircleOutlined, PlusSquareOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import { useRef } from 'react'
import { Item, Menu, useContextMenu } from 'react-contexify'
import 'react-contexify/ReactContexify.css'
import { Conversation } from '../../../../models/conversation'
import { withObserver } from '../../../../shared/func/withObserver'
import { appStore } from '../../../../stores/app'
import { chatStore } from '../../../../stores/chat'
import { homeStore } from '../../store'
import styles from './index.module.scss'

export const Conversations = () => {
  const conversationRef = useRef<Conversation>()
  const { show } = useContextMenu({
    id: 'conversationMenu',
  })
  // 会话列表排序
  chatStore.conversations.sort((a, b) => {
    a.init()
    b.init()
    if (a.lastMessage === null) {
      return -1
    } else if (b.lastMessage === null) {
      return 1
    }
    return a.lastMessage?.createdAt > b.lastMessage?.createdAt ? -1 : 1
  })

  return withObserver(() => (
    <div className={styles.index}>
      <div
        className={clsx(styles.item, styles.add)}
        onClick={homeStore.createConversation}
      >
        <PlusCircleOutlined />
        <span style={{ paddingLeft: 4 }}>新建会话</span>
      </div>
      <div className={styles.list}>
        {chatStore.conversations.map((it) => {
          return (
            <div
              key={it.id}
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

