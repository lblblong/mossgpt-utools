import { CopyOutlined, LoadingOutlined, SyncOutlined } from '@ant-design/icons'
import { message as AntMessage, Spin } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { FC, useLayoutEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus as theme } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Message } from '../../models/message'
import { copyToClipboard } from '../../shared/func/copyToClipboard'
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
  const { messages, onRetry } = props
  const recordRef = useRef({
    first: true,
    lastMessageLength: messages.length,
    lastScrollHeight: 0,
  })

  useLayoutEffect(() => {
    const container = document.getElementById('chat-container')!
    const record = recordRef.current

    if (record.first) {
      container.scrollTop = container.scrollHeight
      record.first = false
    } else {
      if (record.lastMessageLength < messages.length) {
        record.lastMessageLength = messages.length
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth',
        })
      } else {
        if (record.lastScrollHeight === container.scrollHeight) return
        if (
          container.scrollHeight -
            container.offsetHeight -
            container.scrollTop <
          120
        ) {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth',
          })
        }
      }
    }
    record.lastScrollHeight = container.scrollHeight
  }, [messages])

  return withObserver(() => (
    <div
      id="chat-container"
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
            key={message.id}
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
                        return !inline && match ? (
                          <div className={styles.codeBox}>
                            <SyntaxHighlighter
                              children={String(children).replace(/\n$/, '')}
                              style={theme as any}
                              customStyle={{
                                borderRadius: 8,
                                background: appStore.isDark
                                  ? '#000000'
                                  : '#1E1E1E',
                              }}
                              language={match[1] || 'javascript'}
                              PreTag="div"
                              {...props}
                            />
                            <div
                              className={styles.copyBtn}
                              onClick={async () => {
                                try {
                                  await copyToClipboard(String(children).trim())
                                  AntMessage.success('复制成功')
                                } catch (err: any) {
                                  AntMessage.error(err.message)
                                }
                              }}
                            >
                              <CopyOutlined />
                            </div>
                          </div>
                        ) : (
                          <span
                            className={clsx(className, styles.inlineCode)}
                            {...props}
                          >
                            {children}
                          </span>
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
    </div>
  ))
}

