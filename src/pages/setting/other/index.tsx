import { DeleteOutlined, SwapOutlined } from '@ant-design/icons'
import { useStore } from '@libeilong/react-store-provider'
import { Button } from 'antd'
import { withObserver } from '../../../shared/func/withObserver'
import { appStore } from '../../../stores/app'
import { Store } from '../store'

export function OtherSetting() {
  const root = useStore<Store>()
  const store = root.stores.other

  return withObserver(() => (
    <div>
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

