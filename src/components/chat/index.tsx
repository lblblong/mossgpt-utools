import { LoadingOutlined, SyncOutlined } from '@ant-design/icons'
import { Space, Spin } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { FC, useLayoutEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
                        const [copied, setCopied] = useState(false);
                        const match = /language-(\w+)/.exec(className || '') || []
                        const codeContent = String(children).replace(/\n$/, '')
                        const language = match[1] || 'javascript'

                        /* 处理复制代码按钮被点击 */
                        function handleCopyCode() {
                          setCopied(true)
                          setTimeout(() => {
                            setCopied(false)
                          }, 2000)
                        }

                        return (
                          !inline && match ? (
                            <div className={styles.codeBox}>
                              <div className={styles.codeHeader}>
                                <span className={styles.codeLanguage}>{language}</span>
                                <CopyToClipboard text={codeContent} onCopy={handleCopyCode}>
                                  <button className={styles.codeCopyButton}>
                                    {copied ? (
                                      <>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          height="1em"
                                          width="1em"
                                          style={{ marginRight: '4px' }}
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                        Copied!
                                      </>
                                    ) : (
                                      <>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          height="1em"
                                          width="1em"
                                          style={{ marginRight: '4px' }}
                                        >
                                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                        </svg>
                                        Copy
                                      </>
                                    )}
                                  </button>
                                </CopyToClipboard>
                              </div>
                              <SyntaxHighlighter
                                children={codeContent}
                                style={theme as any}
                                customStyle={{ borderRadius: 8 }}
                                language={language}
                                PreTag="div"
                                {...props}
                              />
                            </div>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          )
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

