import clsx from 'clsx'
import { Outlet, useLocation } from 'oh-router-react'
import { Icon } from '../../components/icon'
import { homeRoute, toHome } from '../../pages/home/route'
import { settingRoute, toSetting } from '../../pages/setting/route'
import { templateRoute } from '../../pages/template/route'
import { templateFormRoute } from '../../pages/templateForm/route'
import { router } from '../../router'
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
      icon: 'template',
      onClick: () => router.navigate('/template'),
      active: [templateRoute.path, templateFormRoute.path].includes(
        location.pathname
      ),
    },
    // {
    //   icon: 'robot',
    //   onClick: () => router.navigate('/wechatRobot'),
    //   active: location.pathname === '/wechatRobot',
    // },
    {
      icon: 'setting',
      onClick: () => toSetting(),
      active: location.pathname === settingRoute.path,
    },
    {
      icon: 'github',
      onClick: () =>
        utools.shellOpenExternal('https://github.com/lblblong/mossgpt-utools'),
      active: false,
    },
  ]

  return (
    <div className={styles.index}>
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
          {/* <div className={styles.menu} onClick={() => {}}>
            <Icon value="menu" />
          </div> */}
        </div>
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  )
}

