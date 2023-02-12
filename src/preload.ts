import {
  ChatGPTAPI,
  GetMessageByIdFunction,
  UpsertMessageFunction,
  openai,
} from 'chatgpt'

export function getChatGPTClient(opts: {
  apiKey: string
  /** @defaultValue `'https://api.openai.com'` **/
  apiBaseUrl?: string
  /** @defaultValue `false` **/
  debug?: boolean
  completionParams?: Partial<openai.CompletionParams>
  /** @defaultValue `4096` **/
  maxModelTokens?: number
  /** @defaultValue `1000` **/
  maxResponseTokens?: number
  /** @defaultValue `'User'` **/
  userLabel?: string
  /** @defaultValue `'ChatGPT'` **/
  assistantLabel?: string
  messageStore?: any
  getMessageById?: GetMessageByIdFunction
  upsertMessage?: UpsertMessageFunction
}) {
  return new ChatGPTAPI(opts)
}

