import { useCallback } from 'react'

import { useWebBuilderCallback } from '../../../components/Context/WebBuilder'
import { useFirebase } from '../../../components/Context/Login'

import upload from '../helpers/upload'

export default function Footer() {
  const { firebaseApp } = useFirebase()

  const webBuildercallback = useWebBuilderCallback()

  const publishAction = useCallback(async () => {
    const appValues = await webBuildercallback()
    const uploadData = await upload(firebaseApp, appValues)
    alert(uploadData)
  }, [firebaseApp, webBuildercallback])

  return (
    <button type='button' className='btn btn-alt' onClick={publishAction}>
      Publish
    </button>
  )
}
