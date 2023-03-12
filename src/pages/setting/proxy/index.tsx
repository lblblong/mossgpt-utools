import { useStore } from '@libeilong/react-store-provider'
import { Button, Form, Input, Radio } from 'antd'
import { withObserver } from '../../../shared/func/withObserver'
import { Store } from '../store'

export function ProxySetting() {
  const store = useStore<Store>()

  return withObserver(() => (
    <Form layout="vertical">
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
      <Input.Group compact>
        <Form.Item
          label="代理 IP 地址"
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input
            disabled={!store.baseConfig.proxy?.open}
            placeholder="请输入代理 IP 地址"
            value={store.baseConfig.proxy?.host}
            onChange={({ target }) => {
              store.baseConfig.proxy!.host = target.value.split(':')[0]
              store.baseConfig.proxy!.port = target.value.split(':')[1]
            }}
          />
        </Form.Item>
        <Form.Item
          label="端口"
          style={{
            display: 'inline-block',
            width: 'calc(50% - 8px)',
            margin: '0 8px',
          }}
        >
          <Input
            disabled={!store.baseConfig.proxy?.open}
            placeholder="请输入端口"
            value={store.baseConfig.proxy?.port}
            onChange={({ target }) =>
              (store.baseConfig.proxy!.port = target.value)
            }
          />
        </Form.Item>
      </Input.Group>
      <Form.Item>
        <Button type="primary" onClick={store.saveBaseConfig}>
          保存
        </Button>
      </Form.Item>
    </Form>
  ))
}

