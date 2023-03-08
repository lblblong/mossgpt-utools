import { ConfigProvider, theme } from 'antd'
import { configure } from 'mobx'
import { Observer } from 'mobx-react-lite'
import { ManagerProvider } from 'oh-popup-react'
import 'oh-popup-react/dist/style.css'
import { RouterView } from 'oh-router-react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.scss'
import './assets/css/var.css'
import { router } from './router'
import { popupManager } from './shared/popupManager'
import { update } from './shared/update'
import { appStore } from './stores/app'

update()

configure({ enforceActions: 'never' })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Observer>
    {() => (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890ff',
          },
          algorithm:
            appStore.theme === 'dark'
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
        }}
      >
        <ManagerProvider manager={popupManager} />
        <RouterView router={router} />
      </ConfigProvider>
    )}
  </Observer>
)

