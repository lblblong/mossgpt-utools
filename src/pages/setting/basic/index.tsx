import { useState } from 'react'
import { ControlOutlined } from '@ant-design/icons'
import { useStore } from '@libeilong/react-store-provider'
import { AutoComplete, Button, Col, Form, Input, Select, InputNumber, Row } from 'antd'
import { Models } from '../../../constance'
import { withObserver } from '../../../shared/func/withObserver'
import { appStore } from '../../../stores/app'
import { Store } from '../store'

export function BasicSetting() {
  const root = useStore<Store>()
  const store = root.stores.basic
  const { Option } = Select
  const split_results = root.baseConfig.apiBaseUrl.split('://', 2)
  const [selectedSchema, setSelectedSchema] = useState(`${split_results[0]}://`)
  const [apiUrl, setApiUrl] = useState(split_results[1])

  const selectSchema = (
    <Select
      defaultValue={selectedSchema}
      onChange={(val) => {
        setSelectedSchema(val)
      }}>
      <Option value="https://">https://</Option>
      <Option value="http://">http://</Option>
    </Select >
  );

  return withObserver(() => (
    <Form layout="vertical">
      <Form.Item
        label={
          <span>
            API_KEY (
            {
              [
                <Button
                  size="small"
                  type="link"
                  onClick={appStore.openApiKeyUrl}
                >
                  重新获取API_KEY
                </Button>,
                <Button
                  size="small"
                  type="link"
                  onClick={appStore.openShareUrl}
                >
                  好耶！这些网站免费提供 ChatGPT 服务！
                </Button>,
              ][store.currentLink]
            }
            )
          </span>
        }
      >
        <Input.Password
          value={root.baseConfig.apiKey}
          onChange={({ target }) => (root.baseConfig.apiKey = target.value)}
        />
      </Form.Item>

      <Form.Item
        label="API_URL"
        tooltip="如果你有自己的 ChatGPT 服务，可以在这里填写你的 API_URL。"
      >
        <Input
          value={apiUrl}
          addonBefore={selectSchema}
          onChange={({ target }) => (
            setApiUrl(target.value),
            root.baseConfig.apiBaseUrl = `${selectedSchema}${target.value}`
          )}
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="模型">
            <AutoComplete
              value={root.baseConfig.model}
              options={Models.map((it) => {
                return {
                  label: it,
                  value: it,
                }
              })}
              onChange={(val) => (root.baseConfig.model = val)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Max Tokens">
            <InputNumber
              min={1}
              max={4090}
              value={root.baseConfig.max_tokens}
              onChange={(value) => {
                if (value) root.baseConfig.max_tokens = value
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Prompt"
        tooltip="用于指定对话要开始的话题或上下文，它可以帮助 AI 更好地理解和回应用户的输入。"
      >
        <Input.TextArea
          autoSize={{ minRows: 1, maxRows: 5 }}
          value={root.baseConfig.prompt}
          onChange={({ target }) => (root.baseConfig.prompt = target.value)}
        />
      </Form.Item>

      {store.restConfig && (
        <Row gutter={16}>
          <Col span={5}>
            <Form.Item label="temperature">
              <InputNumber
                min={0}
                max={2}
                step={0.1}
                value={root.baseConfig.temperature}
                onChange={(value) => {
                  if (value) root.baseConfig.temperature = value
                }}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="top_p">
              <InputNumber
                min={0}
                max={1}
                step={0.1}
                value={root.baseConfig.top_p}
                onChange={(value) => {
                  if (value) root.baseConfig.top_p = value
                }}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="presence_penalty">
              <InputNumber
                min={-2}
                max={2}
                step={0.1}
                value={root.baseConfig.presence_penalty}
                onChange={(value) => {
                  if (value) root.baseConfig.presence_penalty = value
                }}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="frequency_penalty">
              <InputNumber
                min={-2}
                max={2}
                step={0.1}
                value={root.baseConfig.frequency_penalty}
                onChange={(value) => {
                  if (value) root.baseConfig.frequency_penalty = value
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      <Form.Item>
        <Button type="primary" onClick={root.saveBaseConfig}>
          保存
        </Button>
        {!store.restConfig && (
          <Button
            type="link"
            icon={<ControlOutlined />}
            onClick={() => (store.restConfig = true)}
          >
            高级配置
          </Button>
        )}
      </Form.Item>
    </Form>
  ))
}

