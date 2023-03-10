import { useStore } from '@libeilong/react-store-provider'
import { Button, Form, Input, Radio } from 'antd'
import { withObserver } from '../../../shared/func/withObserver'
import { Store } from '../store'

export function ProxySetting() {
  const store = useStore<Store>()

  return withObserver(() => (
    <Form>
      <Form.Item label="状态">
        <Radio.Group
          value={store.baseConfig.proxy?.open}
          onChange={({ target }) => {
            store.baseConfig.proxy!.open = target.value
          }}
        >
          <Radio value={true}>开启</Radio>
          <Radio value={false}>关闭</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="IP & 端口">
        <Input.Group compact>
          <Form.Item
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Input
              disabled={!store.baseConfig.proxy?.open}
              placeholder="IP 地址"
              value={store.baseConfig.proxy?.host}
              onChange={({ target }) =>
                (store.baseConfig.proxy!.host = target.value)
              }
            />
          </Form.Item>
          <Form.Item
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 8px',
            }}
          >
            <Input
              disabled={!store.baseConfig.proxy?.open}
              placeholder="端口"
              value={store.baseConfig.proxy?.port}
              onChange={({ target }) =>
                (store.baseConfig.proxy!.port = target.value)
              }
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={store.saveBaseConfig}>
          保存
        </Button>
      </Form.Item>
    </Form>
  ))
}

