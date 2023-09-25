import React, { useCallback, useContext, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import Avatar from '@components/Avatar/Avatar'
import { activePage, urls } from '@/utils/navigation'
import classes from './styles.module.less'
import { UserContext } from '@/providers/userProvider/UserContext'
import { postLogout } from '@/api/auth'

const cx = classNames.bind(classes)

const menuList = [
  {
    id: 'index',
    title: 'Home',
    link: '/',
  },
  {
    id: 'leaderboard',
    title: 'Leaderboard',
    link: '/leaderboard',
  },
  {
    id: 'game',
    title: 'Game',
    link: '/game',
  },
  {
    id: 'forum',
    title: 'Forum',
    link: '/forum',
  },
]

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { avatar } = useContext(UserContext)
  const menu = useMemo(
    () =>
      menuList.map(item => ({
        ...item,
        className:
          item.id === activePage
            ? classes['header__menu__item--active']
            : classes['header__menu__item--default'],
      })),
    [activePage]
  )

  const handleLogout = useCallback(async () => {
    await postLogout()
    window.location.href = urls.login
  }, [])

  const switchShowUserMenu = useCallback(() => {
    setShowUserMenu(prevState => !prevState)
  }, [showUserMenu])

  return (
    <div className={classes.header}>
      <div className={classes.header__logotype}>Tetris</div>
      <div className={classes.header__menu}>
        {menu.map(item => (
          <Link
            to={item.link}
            className={cx(classes.header__menu__item, item.className)}
            key={`menu-header__item-${item.id}`}>
            {item.title}
          </Link>
        ))}
      </div>
      <div
        className={classes.header__menu__avatar}
        onClick={switchShowUserMenu}>
        <Avatar size="xs" img={avatar} />
        {showUserMenu && (
          <ul className={classes.header__user_menu}>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default Header
