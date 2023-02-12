import { configure } from 'mobx'
import { ManagerProvider } from 'oh-popup-react'
import 'oh-popup-react/dist/style.css'
import { RouterView } from 'oh-router-react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.scss'
import './assets/css/var.css'
import { router } from './router'
import { popupManager } from './shared/popupManager'

configure({ enforceActions: 'never' })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <ManagerProvider manager={popupManager} />
    <RouterView router={router} />
  </>
)

