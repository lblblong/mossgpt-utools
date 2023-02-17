import { DeleteOutlined, SwapOutlined } from '@ant-design/icons'
import { useStore, withStore } from '@libeilong/react-store-provider'
import { AutoComplete, Button, Form, Input } from 'antd'
import { Models } from '../../constance'
import { withObserver } from '../../shared/func/withObserver'
import { appStore } from '../../stores/app'
import styles from './index.module.scss'
import { Store } from './store'

function _Page() {
  const store = useStore<Store>()

  return withObserver(() => (
    <div className={styles.index}>
      <h2>设置</h2>
      <div className={styles.title}>基本配置</div>
      <Form layout="vertical">
        <Form.Item
          label={
            <span>
              API_KEY
              <Button size="small" type="link" onClick={appStore.openApiKeyUrl}>
                (重新获取API_KEY)
              </Button>
            </span>
          }
        >
          <Input.Password
            value={store.baseConfig.apiKey}
            onChange={({ target }) => (store.baseConfig.apiKey = target.value)}
          />
        </Form.Item>

        <Form.Item label="模型">
          <AutoComplete
            value={store.baseConfig.model}
            options={Models.map((it) => {
              return {
                label: it,
                value: it,
              }
            })}
            onChange={(val) => (store.baseConfig.model = val)}
          />
        </Form.Item>

        <Form.Item
          label="Prompt"
          tooltip="用于指定对话要开始的话题或上下文，它可以帮助 ChatGPT 更好地理解和回应用户的输入。"
        >
          <Input
            value={store.baseConfig.prompt}
            onChange={({ target }) => (store.baseConfig.prompt = target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={store.saveBaseConfig}>
            保存
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.title}>其他</div>
      <div>
        <span>
          {store.storage.convs.length} 个会话、{store.storage.msgs.length}{' '}
          条消息
        </span>
        <Button
          onClick={store.clearStorage}
          icon={<DeleteOutlined />}
          type="link"
        >
          清除缓存
        </Button>
      </div>
      <div>
        <Button onClick={appStore.toggleTheme} icon={<SwapOutlined />}>
          切换{appStore.isDark ? '明亮主题' : '夜间模式'}
        </Button>
      </div>
    </div>
  ))
}

export const Page = withStore(_Page, Store)

