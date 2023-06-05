import { Message } from './models/message'
import { MatchType } from './models/template'
import { IConfig, MessageShortcutKey } from './types'

export const Models = [
  'gpt-3.5-turbo',
  'gpt-3.5-turbo-0301',
  'gpt-4',
  'gpt-4-0314',
  'gpt-4-32k',
  'gpt-4-32k-0314',
]

export const DefaultConfig: IConfig = {
  model: Models[0],
  apiBaseUrl: 'https://cold-crow-90.deno.dev/v1',
  systemMessage: undefined,
  max_tokens: undefined,
  temperature: undefined,
  top_p: undefined,
  presence_penalty: undefined,
  frequency_penalty: undefined,

  proxy: {
    open: false,
    host: undefined,
    port: undefined,
    username: undefined,
    password: undefined,
  },

  setting: {
    autoTranslation: true,
    autoTitle: false,
    textSpacing: false,
    messageShortcutKey: MessageShortcutKey.Enter,
  },
}

export const DefaultMessageTemplates = [
  {
    title: '总结内容',
    template:
      '将以下文字概括为 100 个字，使其易于阅读和理解。避免使用复杂的句子结构或技术术语：\n{内容}',
    shortcut: true,
    matchType: MatchType.over,
  },
  {
    title: '写作润色',
    template:
      '作为一名中文写作改进助理，你的任务是改进所提供文本的拼写、语法、清晰、简洁和整体可读性，同时分解长句，减少重复，并提供改进建议。请只提供文本的更正版本，避免包括解释。请从编辑以下文本开始：\n{内容}',
    shortcut: true,
    matchType: MatchType.over,
  },
  {
    title: '改写为小红书风格',
    template:
      '请使用 Emoji 风格编辑以下段落，该风格以引人入胜的标题、每个段落中包含表情符号和在末尾添加相关标签为特点。请确保保持原文的意思：\n{内容}',
    shortcut: false,
    matchType: MatchType.over,
  },
  {
    title: '解释代码',
    template:
      '我希望你能充当代码解释者，阐明代码的语法和语义，请解释这段代码：{内容}',
    shortcut: false,
    matchType: MatchType.over,
  },
  {
    title: '提示词修改器',
    template:
      '我正在尝试从以下提示词中获得 GPT-4 的良好结果："{内容}"，你能否写出更优化、能够产生更好结果的提示词？',
  },
  {
    title: '周报生成器',
    template:
      '使用下面提供的文本作为中文周报的基础，生成一个简洁的摘要，突出最重要的内容。该报告应以 markdown 格式编写，并应易于阅读和理解，以满足一般受众的需要。特别是要注重提供对利益相关者和决策者有用的见解和分析。你也可以根据需要使用任何额外的信息或来源：\n{内容}',
  },
  {
    title: '翻译为中文',
    template: 'any-zh translation of "{内容}"',
  },
  {
    title: '翻译为英文',
    template: 'any-en translation of "{内容}"',
  },
  {
    title: '英语翻译或修改',
    template:
      '我希望你能充当英语翻译、拼写纠正者和改进者。我将用任何语言与你交谈，你将检测语言，翻译它，并在我的文本的更正和改进版本中用英语回答。我希望你用更漂亮、更优雅、更高级的英语单词和句子来取代我的简化 A0 级单词和句子。保持意思不变，但让它们更有文学性。我希望你只回答更正，改进，而不是其他，不要写解释。我的第一句话是：{内容}',
  },
]

export const DefaultConversationTemplates: any[] = []

export const dataVersion = 4

export const ApiUrls = [
  {
    name: 'OpenAI 官方线路',
    url: 'https://api.openai.com/v1',
    needVpn: true,
  },
  {
    name: '免费线路 - 来自群友盛先生',
    url: 'https://cold-crow-90.deno.dev/v1',
    needVpn: false,
  },
]

export const Introduction = __INTRODUCTION__

export const HelperConversation: {
  name: string
  messages: Pick<Message, 'text' | 'role' | 'state' | 'failedReason'>[]
} = {
  name: '欢迎使用 Moss',
  messages: [
    {
      role: 'assistant',
      text: '## 初次见面，我是 Moss\n' + Introduction,
      state: 'done',
    },
  ],
}

export const Urls = {
  repo: 'https://github.com/lblblong/mossgpt-utools',
}

