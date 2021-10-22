import { EmptyLayout } from '@standardcreative/client-core/src/common/components/Layout/EmptyLayout'
import { AuthService } from '@standardcreative/client-core/src/user/state/AuthService'
import React, { useEffect } from 'react'
import { useDispatch } from '@standardcreative/client-core/src/store'

import { useTranslation } from 'react-i18next'
import AdminLogin from '../components/AdminLogin'

interface Props {}

export const IndexPage = (props: Props): any => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    AuthService.doLoginAuto(true)
  }, [])

  return (
    <EmptyLayout pageTitle={t('login.pageTitle')}>
      <AdminLogin />
    </EmptyLayout>
  )
}

export default IndexPage
