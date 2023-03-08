import { LoadingOutlined, SyncOutlined } from '@ant-design/icons'
import { Space, Spin } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { FC, useLayoutEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus as theme } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Message } from '../../models/message'
import { withObserver } from '../../shared/func/withObserver'
import { appStore } from '../../stores/app'
import styles from './index.module.scss'

type ChatMessage = Pick<
  Message,
  'self' | 'id' | 'state' | 'text' | 'createdAt' | 'failedReason'
>

interface ChatProps {
  messages: ChatMessage[]
  onRetry?: (message: ChatMessage) => void
}

export const Chat: FC<ChatProps> = (props) => {
  const firstRef = useRef(true)
  const { messages, onRetry } = props

  useLayoutEffect(() => {
    if (firstRef.current) {
      const wrapEl = document.getElementById('chat-wrap')
      wrapEl!.scrollTop = wrapEl!.scrollHeight
    } else {
      // document
      //   .getElementById(messages[messages.length - 1].id)
      //   ?.scrollIntoView({
      //     behavior: firstRef.current ? 'auto' : 'smooth',
      //   })
      document.getElementById('last-message')?.scrollIntoView({
        behavior: firstRef.current ? 'auto' : 'smooth',
      })
    }
    firstRef.current = false
  }, [messages])

  return withObserver(() => (
    <div
      id="chat-wrap"
      className={clsx(styles.index, appStore.isDark && styles.dark)}
    >
      {messages.map((message) => {
        let text = message.text
        if (message.state === 'fail' && text.length === 0) {
          text = message.failedReason || ''
        }
        const retryAction = (
          <div className={styles.retryAction}>
            <SyncOutlined onClick={() => onRetry && onRetry(message)} />
          </div>
        )
        return (
          <div
            className={clsx(
              styles.item,
              message.self ? styles.user : styles.chatgpt
            )}
            style={{
              alignItems: message.self ? 'flex-end' : 'flex-start',
            }}
            id={message.id}
          >
            <div className={styles.bubbleWrap}>
              <div className={styles.bubble}>
                {text === '' ? (
                  <p>
                    <SyncOutlined spin />
                  </p>
                ) : message.self ? (
                  // 替换所有换行为br
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<p>${text.replace(/[\r\n]/g, '<br>')}</p>`,
                    }}
                  ></div>
                ) : (
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match =
                          /language-(\w+)/.exec(className || '') || []
                        return (
                          <div className={styles.codeBox}>
                            <SyntaxHighlighter
                              children={String(children).replace(/\n$/, '')}
                              style={theme as any}
                              customStyle={{ borderRadius: 8 }}
                              language={match[1] || 'javascript'}
                              PreTag="div"
                              {...props}
                            />
                          </div>
                        )
                      },
                    }}
                  >
                    {text}
                  </ReactMarkdown>
                )}
              </div>
              {message.state === 'fail' && retryAction}
            </div>
            <div className={styles.time}>
              <span>{dayjs(message.createdAt).format('MM-DD HH:mm')}</span>
              {message.state !== 'done' && (
                <span
                  className={styles.state}
                  style={{
                    color: message.state === 'fail' ? 'red' : undefined,
                  }}
                >
                  {
                    {
                      sending: (
                        <Spin
                          size="small"
                          indicator={<LoadingOutlined size={8} />}
                        />
                      ),
                      fail: message.failedReason,
                    }[message.state]
                  }
                </span>
              )}
            </div>
          </div>
        )
      })}
      <div id="last-message"></div>
    </div>
  ))
}

