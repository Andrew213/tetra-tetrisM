import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ErrorType } from '@/api/getApiError'
import {
  UserContextProvider,
  UserTheme,
} from '@/providers/userProvider/UserProvider'
import { urls } from '@/utils/navigation'
import { UserType } from '@components/types'
import Preloader from '@components/Preloader/Preloader'
import AppRouters from './routers'
import { getUserInfo } from './api/auth'
import { signInWithYandex } from './api/oauth'
import useMessage from 'antd/lib/message/useMessage'
import { baseFetch } from './api/api'

function App() {
  const [getUserError, setGetUserError] = useState<ErrorType | null>()
  const [userInfo, setUserInfo] = useState<UserType>({} as UserType)
  const [theme, setTheme] = useState<UserTheme>({} as UserTheme)
  const [isFetcing, setIsFetching] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const [message] = useMessage()

  const activePage = location.pathname.substring(1).split('/')[0]
  const baseUrl = `http://localhost:3001`
  useEffect(() => {
    const getTopics = async () => {
      const response = await baseFetch.get(`${baseUrl}/comment`)
      console.log(`response `, response)
      console.log(1)
    }

    getTopics()
    const yandexAuth = () => {
      const code = new URLSearchParams(location.search).get('code')
      if (code) {
        return signInWithYandex(code)
      } else return Promise.resolve()
    }
    const fetchUserInfo = async () => {
      await getUserInfo().then(result => {
        setUserInfo(result)
        if (activePage === 'login' || activePage === 'registration') {
          navigate(urls.home)
        }
        setIsFetching(false)
      })
    }
    yandexAuth()
      .then(() => fetchUserInfo())
      .catch(error => {
        if (activePage !== 'login' && activePage !== 'registration') {
          navigate(urls.login)
        }
        setGetUserError(error)
        setIsFetching(false)
      })
  }, [])

  return (
    <React.StrictMode>
      <UserContextProvider
        user={userInfo}
        settingsTheme={theme}
        setUser={setUserInfo}
        setTheme={setTheme}>
        {isFetcing ? (
          <Preloader />
        ) : (
          <AppRouters error={getUserError?.error?.code || 401} />
        )}
      </UserContextProvider>
    </React.StrictMode>
  )
}

export default App
