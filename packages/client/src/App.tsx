import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorType } from '@/api/getApiError'
import { UserContextProvider } from '@/providers/userProvider/UserProvider'
import { urls } from '@/utils/navigation'
import { UserType } from '@components/types'
import Preloader from '@components/Preloader/Preloader'
import AppRouters from './routers'
import { getUserInfo } from './api/auth'
import { baseApiUrl } from '@/api/api'
import { useDispatch } from 'react-redux'
import { setUserData } from '@/services/userSlice'

const resourcesUrl = baseApiUrl + 'resources'

function App() {
  const [getUserError, setGetUserError] = useState<ErrorType | null>()
  const [userInfo, setUserInfo] = useState<UserType>({} as UserType)
  const [isFetcing, setIsFetching] = useState(true)
  const navigate = useNavigate()
  const activePage = window.location.pathname.substring(1).split('/')[0]
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUserInfo = async () => {
      await getUserInfo()
        .then(result => {
          dispatch(setUserData(result))
          setUserInfo(result)
          if (activePage === 'login' || activePage === 'registration') {
            navigate(urls.home)
          }
          setIsFetching(false)
        })
        .catch(error => {
          setGetUserError(error)
          setIsFetching(false)
        })
    }
    fetchUserInfo()
  }, [])

  return (
    <React.StrictMode>
      <UserContextProvider user={userInfo} setUser={setUserInfo}>
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
