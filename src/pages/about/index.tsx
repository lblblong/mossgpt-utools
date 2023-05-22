import { GithubFilled, WechatFilled, WindowsOutlined } from '@ant-design/icons'
import { Button, Divider, Space } from 'antd'
import { Markdown } from '../../components/markdown'
import { Introduction } from '../../constance'
import { stores } from '../../stores'
import styles from './index.module.scss'

export function Page() {
  return (
    <div className={styles.index}>
      <Space direction="vertical" size={18}>
        <div className={styles.title}>MossGPT</div>
        <div>没有人类的文明，毫无意义 - 《流浪地球》</div>
        <Space>
          <Button
            type="primary"
            icon={<WindowsOutlined />}
            onClick={stores.app.openDesktopDownload}
          >
            下载桌面端
          </Button>
          <Button
            type="primary"
            icon={<WechatFilled />}
            onClick={stores.app.openQrcode}
          >
            交流群
          </Button>
          <Button icon={<GithubFilled />} onClick={stores.app.openGitHub}>
            GitHub
          </Button>
        </Space>

        <Divider>说明</Divider>
        <div className={styles.help}>
          <Markdown dark={stores.app.isDark}>{Introduction}</Markdown>
        </div>
      </Space>
    </div>
  )
}

