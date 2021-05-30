import { useCallback } from 'react'

import { useWebBuilderCallback } from '../../../../components/Context/WebBuilder'
import { useFirebase } from '../../../../components/Context/Login'
import { useAlerts } from '../../../../components/Context/Alert'

import upload from '../../helpers/upload'

export default function Footer() {
  const { firebaseApp } = useFirebase()
  const { addAlert } = useAlerts()

  const webBuilderCallback = useWebBuilderCallback()

  const publishAction = useCallback(async () => {
    const appValues = await webBuilderCallback()
    // TODO: Alert Validate Must-have Values
    if (
      !['appKey', 'appTheme', 'appName', 'appIcon'].reduce(
        (appAcc, appKey) => appAcc && appValues[appKey],
        true
      )
    ) {
      alert('Missing Important Details')
      return
    }
    // TODO: Loading Start
    const uploadData = await upload(firebaseApp, appValues)
    // TODO: Loading End
    // TODO: Alert Result
    addAlert(JSON.stringify(uploadData))
  }, [addAlert, firebaseApp, webBuilderCallback])

  return (
    <button type='button' className='btn btn-alt' onClick={publishAction}>
      Publish
    </button>
  )
}
