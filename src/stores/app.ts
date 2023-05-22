import { message } from 'antd'
import { makeAutoObservable } from 'mobx'
import React from 'react'
import semver from 'semver'
import { version } from '../../package.json'
import { API } from '../api'
import { openBasePopup } from '../components/popups/basePopup'
import { openNotice } from '../components/popups/notice'
import { openUpdate } from '../components/popups/update'
import { Qrcode } from '../components/qrcode'
import { Urls } from '../constance'
import { platform } from '../shared/platform'
import { Storage } from '../shared/storage'
import { IgnoreType } from '../types'

export class AppStore {
  theme: 'light' | 'dark' = 'light'

  get isDark() {
    return this.theme === 'dark'
  }

  constructor() {
    makeAutoObservable(this)
    this.init()
  }

  init = async () => {
    this.setTheme(Storage.getTheme())
    const update = await this.checkUpdate()
    if (!update) this.checkNotice()
  }

  openApiKeyUrl = () => {
    platform.shellOpenExternal('https://platform.openai.com/account/api-keys')
  }

  openShareUrl = () => {
    platform.shellOpenExternal(
      'https://github.com/lblblong/mossgpt-utools/issues/4'
    )
  }

  openProxyShareUrl = () => {
    platform.shellOpenExternal(
      'https://github.com/lblblong/mossgpt-utools/issues/53'
    )
  }

  openGitHub = () => {
    platform.shellOpenExternal(Urls.repo)
  }

  openOpenAIUsage = () => {
    platform.shellOpenExternal('https://platform.openai.com/account/usage')
  }

  openOneClickDeploy = () => {
    platform.shellOpenExternal(
      'https://dash.deno.com/new?url=https://raw.githubusercontent.com/justjavac/openai-proxy/main/main.ts'
    )
  }

  setTheme = (theme: 'light' | 'dark' | 'auto') => {
    if (theme === 'auto') {
      Storage.removeTheme()
      theme = platform.isDarkColors() ? 'dark' : 'light'
    } else {
      Storage.setTheme(theme)
    }

    this.theme = theme
    if (theme === 'dark') {
      document.body.classList.add('dartTheme')
    } else {
      document.body.classList.remove('dartTheme')
    }
  }

  checkUpdate = async (force = false) => {
    const res = await fetch(
      'https://api.github.com/repos/lblblong/mossgpt-utools/releases/latest'
    )
    const {
      tag_name,
      body,
      html_url,
    }: { tag_name?: string; body: string; html_url: string } =
      (await res.json()) || {}
    if (!tag_name || semver.valid(tag_name) === null) return false
    if (semver.gte(version, tag_name)) return false
    const ignore = Storage.getIgnore(IgnoreType.version, tag_name)
    if (ignore && !force) return false

    setTimeout(() => {
      openUpdate({
        newVersion: tag_name,
        description: body,
        onIgnore() {
          Storage.setIgnore(IgnoreType.version, tag_name)
        },
        onUpdate() {
          platform.shellOpenExternal(html_url)
        },
      })
    }, 600)
    return true
  }

  checkNotice = async () => {
    const { id, data, version: versionLimit } = await API.other.getNotice()
    const ignore = Storage.getIgnore(IgnoreType.notice, id)
    if (ignore || !semver.satisfies(version, versionLimit)) return
    Storage.setIgnore(IgnoreType.notice, id)
    setTimeout(() => {
      openNotice({
        data,
      })
    }, 600)
  }

  openDesktopDownload = () => {
    platform.shellOpenExternal('https://moss.csxq.fun')
  }

  openQrcode = async () => {
    try {
      message.loading('请稍等...')
      const qrcode = await API.other.getQrcode()
      openBasePopup({
        children: React.createElement(Qrcode, {
          src: qrcode,
          text: '请使用微信扫码备注 “mossgpt” 加群',
        }),
      })
    } catch (err) {
    } finally {
      message.destroy()
    }
  }

  openQrcodePay = async () => {
    try {
      message.loading('请稍等...')
      const qrcode = await API.other.getQrcodePay()
      openBasePopup({
        children: React.createElement(Qrcode, {
          src: qrcode,
          text: '请使用微信扫码支付',
        }),
      })
    } catch (err) {
    } finally {
      message.destroy()
    }
  }
}

