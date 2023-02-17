import { LoadingOutlined } from '@ant-design/icons'
import { Space, Spin } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { FC, useLayoutEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus as theme } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styles from './index.module.scss'
import { appStore } from '../../stores/app'
import { withObserver } from '../../shared/func/withObserver'

interface ChatProps {
  messages: {
    text: string
    self: boolean
    createdAt: number
    id: string
    state: 'sending' | 'failed' | 'persisted'
  }[]
}

export const Chat: FC<ChatProps> = (props) => {
  const firstRef = useRef(true)
  const { messages } = props

  useLayoutEffect(() => {
    if (firstRef.current) {
      const wrapEl = document.getElementById('chat-wrap')
      wrapEl!.scrollTop = wrapEl!.scrollHeight
    } else {
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
            <div className={styles.bubble}>
              {message.self ? (
                // 替换所有换行为br
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<p>${message.text.replace(/[\r\n]/g, '<br>')}</p>`,
                  }}
                ></div>
              ) : (
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '') || []
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
                  {message.text}
                </ReactMarkdown>
              )}
            </div>
            <div className={styles.time}>
              <Space>
                <span>{dayjs(message.createdAt).format('MM-DD HH:mm')}</span>
                <span>
                  {
                    {
                      sending: (
                        <Spin
                          size="small"
                          indicator={<LoadingOutlined size={8} />}
                        />
                      ),
                      failed: message.self ? '接收失败' : '发送失败',
                      persisted: '',
                    }[message.state]
                  }
                </span>
              </Space>
            </div>
          </div>
        )
      })}
      <div id="last-message"></div>
    </div>
  ))
}

