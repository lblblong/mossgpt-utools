import clsx from 'clsx'
import { Outlet, useLocation } from 'oh-router-react'
import { Icon } from '../../components/icon'
import { homeRoute, toHome } from '../../pages/home/route'
import { settingRoute, toSetting } from '../../pages/setting/route'
import { templateRoute, toTemplate } from '../../pages/template/route'
import { templateFormRoute } from '../../pages/templateForm/route'
import { toTranslation } from '../../pages/translation/route'
import { withObserver } from '../../shared/func/withObserver'
import { appStore } from '../../stores/app'
import styles from './index.module.scss'

export const BasicLayout = () => {
  const location = useLocation()

  const menus = [
    {
      icon: 'chat',
      onClick: () => toHome(),
      active: location.pathname === homeRoute.path,
    },
    {
      icon: 'translation',
      onClick: () => toTranslation(),
      active: location.pathname === '/translation',
    },
    {
      icon: 'template',
      onClick: () => toTemplate(),
      active: [templateRoute.path, templateFormRoute.path].includes(
        location.pathname
      ),
    },
    {
      icon: 'github',
      onClick: () =>
        utools.shellOpenExternal('https://github.com/lblblong/mossgpt-utools'),
      active: false,
    },
  ]

  return withObserver(() => (
    <div className={clsx(styles.index, appStore.isDark && styles.dark)}>
      <div className={styles.navbar}>
        <div>
          {menus.map((menu) => (
            <div
              className={clsx(
                styles.menu,
                menu.active ? styles.active : undefined
              )}
              onClick={() => menu.onClick()}
              key={menu.icon}
            >
              <Icon value={menu.icon} />
            </div>
          ))}
        </div>
        <div>
          <div className={styles.menu} onClick={() => toSetting()}>
            <Icon value="setting" />
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  ))
}

