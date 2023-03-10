import {
  ChatGPTAPI,
  ChatGPTAPIOptions
} from '@libeilong/chatgpt';
import proxy from "https-proxy-agent";
import nodeFetch from "node-fetch";

export function getChatGPTClient(opts: ChatGPTAPIOptions & {
  proxy?: {
    host?: string
    port?: string | number
  }
}) {
  if (opts.proxy?.host && opts.proxy?.port) {
    opts.fetch = ((url: any, options = {}) => {
      const defaultOptions = {
        agent: proxy({
          host: opts.proxy?.host,
          port: opts.proxy?.port
        })
      }

      return nodeFetch(url, {
        ...defaultOptions,
        ...options
      })
    }) as any
  }
  return new ChatGPTAPI(opts)
}

