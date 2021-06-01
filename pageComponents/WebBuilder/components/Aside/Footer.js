import { useCallback } from 'react'
import { useRouter } from 'next/router'

import { useWebBuilderCallback } from '../../../../components/Context/WebBuilder'
import { useFirebase } from '../../../../components/Context/Login'
import { useLoading } from '../../../../components/Context/Loading'
import { useAlerts } from '../../../../components/Context/Alert'

import upload from '../../helpers/upload'

export default function Footer() {
  const router = useRouter()
  const { firebaseApp } = useFirebase()
  const { addAlert } = useAlerts()
  const { queueLoading, clearLoading } = useLoading()

  const webBuilderCallback = useWebBuilderCallback()

  const publishAction = useCallback(async () => {
    const appValues = await webBuilderCallback()
    if (
      !['appKey', 'appTheme', 'appName', 'appIcon'].reduce(
        (appAcc, appKey) => appAcc && appValues[appKey],
        true
      )
    ) {
      addAlert('Please ensure that "App Name" and "App Icon" Exists.', {
        variant: 'danger',
        autoDismiss: false,
      })
      return
    }
    queueLoading()
    try {
      const uploadData = await upload(firebaseApp, appValues)
      if (uploadData && uploadData.status) {
        addAlert('Successfuly set-up Website.', {
          variant: 'success',
        })
      }
    } catch (error) {
      addAlert('Something went wrong...', {
        variant: 'danger',
        autoDismiss: false,
      })
    }
    clearLoading()
    // TODO: Open Website in new Tab
    router.push('/dashboard/websites')
  }, [
    addAlert,
    clearLoading,
    firebaseApp,
    queueLoading,
    router,
    webBuilderCallback,
  ])

  return (
    <button type='button' className='btn btn-alt' onClick={publishAction}>
      Publish
    </button>
  )
}
