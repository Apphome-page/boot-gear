import { useCallback } from 'react'

import { useWebBuilderCallback } from '../../../components/Context/WebBuilder'
import { useFirebase } from '../../../components/Context/Login'

import upload from '../helpers/upload'

export default function Footer() {
  const { firebaseApp } = useFirebase()

  const webBuilderCallback = useWebBuilderCallback()

  const publishAction = useCallback(async () => {
    const appValues = await webBuilderCallback()
    const uploadData = await upload(firebaseApp, appValues)
    console.log(appValues, uploadData)
  }, [firebaseApp, webBuilderCallback])

  return (
    <button type='button' className='btn btn-alt' onClick={publishAction}>
      Publish
    </button>
  )
}
