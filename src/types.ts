

export interface IConfig {
  model: string
  prompt: string
  proxy?: {
    host?: string
    port?: string
    open: boolean
  }
}