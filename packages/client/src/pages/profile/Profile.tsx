import React, { useCallback, useContext, useEffect, useState } from 'react'
import classes from './styles.module.less'
import { Button, Form, Input, Modal } from 'antd'
import Avatar from '@/components/Avatar/Avatar'
import { UserContext } from '@/providers/userProvider/UserContext'
import { baseApiUrl } from '@/api/api'
import { useForm } from 'antd/es/form/Form'
import {
  PasswordRequest,
  UserProfile,
  putChangePassword,
  putUserProfile,
} from '@/api/user'
import { ChangeAvatar } from '@/components/ChangeAvatar/ChangeAvatar'
import { getUserInfo } from '@/api/auth'
import { DEFAULT_AVATAR } from '@/utils/constants'
import PageFrame from '@/components/PageFrame/PageFrame'

interface FieldData {
  name: string | number | (string | number)[]
  value?: unknown
  touched?: boolean
  validating?: boolean
  errors?: string[]
}

function ObjectToFieldData<T extends Record<string, unknown>>(
  model: T
): FieldData[] {
  const res = [] as Array<FieldData>
  for (const [key, value] of Object.entries(model)) {
    res.push({
      name: key,
      value: value,
    })
  }
  return res
}

const Profile: React.FC = () => {
  const user = useContext(UserContext)
  const [avatar, setAvatar] = useState('')
  const [profileFields] = useState<FieldData[]>(ObjectToFieldData(user))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false)
  const [passwordForm] = useForm()

  const resourcesUrl = baseApiUrl + 'resources'
  useEffect(() => {
    if (user.avatar) {
      setAvatar(resourcesUrl + user.avatar)
    } else {
      setAvatar(DEFAULT_AVATAR)
    }
  }, [])
  const openChangePasswordDialog = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const cancelChangePassword = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const changePassword = useCallback(async (values: PasswordRequest) => {
    await putChangePassword(values)
    setIsModalOpen(false)
  }, [])

  const changeProfileData = useCallback((values: UserProfile) => {
    putUserProfile(values)
  }, [])

  const onAvatarChanged = useCallback(() => {
    getUserInfo().then(u => {
      if (u.avatar) {
        setAvatar(resourcesUrl + u.avatar)
      } else {
        setAvatar(DEFAULT_AVATAR)
      }
    })
  }, [])

  return (
    <PageFrame pageType="profile">
      <>
        <div className={classes.profile}>
          <Avatar size="md" img={avatar}></Avatar>
          <Button
            onClick={() => {
              setIsAvatarModalOpen(true)
            }}>
            Change avatar
          </Button>
          <ChangeAvatar
            isOpen={isAvatarModalOpen}
            avatar={user.avatar as string}
            onCancel={() => setIsAvatarModalOpen(false)}
            onOk={() => {
              setIsAvatarModalOpen(false)
              setTimeout(() => onAvatarChanged(), 100)
            }}
          />
          <div className={classes.profile__form}>
            <Form fields={profileFields} onFinish={changeProfileData}>
              <Form.Item
                labelCol={{ span: 24 }}
                colon={false}
                label={<span>First name</span>}
                name="first_name">
                <Input placeholder="First name" />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }}
                colon={false}
                label={<span>Second name</span>}
                name="second_name">
                <Input placeholder="Second name" />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }}
                colon={false}
                label={<span>Login</span>}
                name="login">
                <Input placeholder="Login" />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }}
                colon={false}
                label={<span>Email</span>}
                name="email">
                <Input placeholder="Email" type="email" />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }}
                colon={false}
                label={<span>Phone</span>}
                name="phone">
                <Input placeholder="Phone" />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }}
                colon={false}
                label={<span>Display name</span>}
                name="display_name">
                <Input placeholder="Display name" />
              </Form.Item>
              <button type="submit" className={classes.profile__btn__primary}>
                Save
              </button>
              <Button
                className={classes.profile__btn}
                onClick={openChangePasswordDialog}>
                Change password
              </Button>
            </Form>
            <Modal
              open={isModalOpen}
              onCancel={cancelChangePassword}
              onOk={passwordForm.submit}>
              <Form
                className={classes.passwordForm}
                form={passwordForm}
                onFinish={changePassword}>
                <Form.Item name="oldPassword">
                  <Input type="password" placeholder="Old password"></Input>
                </Form.Item>
                <Form.Item name="newPassword">
                  <Input type="password" placeholder="New password"></Input>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
      </>
    </PageFrame>
  )
}

export default Profile
