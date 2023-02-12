import { DeleteOutlined } from '@ant-design/icons'
import { useStore, withStore } from '@libeilong/react-store-provider'
import { Button, Form, Input, Select } from 'antd'
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
          <Select
            value={store.baseConfig.model}
            onChange={(val) => (store.baseConfig.model = val)}
          >
            {Models.map((it, i) => {
              return (
                <Select.Option key={i} value={it}>
                  {it}
                </Select.Option>
              )
            })}
          </Select>
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
    </div>
  ))
}

export const Page = withStore(_Page, Store)

