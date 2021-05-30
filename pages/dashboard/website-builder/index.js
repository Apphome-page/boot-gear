import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import fetch from 'cross-fetch'

import { useLogin, useFirebase } from '../../../components/Context/Login'
import { useAlerts } from '../../../components/Context/Alert'
import { useLoading } from '../../../components/Context/Loading'

import WebBuilderPlaceholder from '../../../pageComponents/WebBuilder/Placeholder'

import keyValidate from '../../../pageComponents/WebBuilder/helpers/keyValidate'
import urlToFile from '../../../utils/urlToFile'

const WebBuilderComponent = dynamic(
  () => import('../../../pageComponents/WebBuilder'),
  {
    ssr: false,
  }
)

export default function WebBuilder() {
  const router = useRouter()
  const { addAlert } = useAlerts()
  const { queueLoading, clearLoading } = useLoading()
  const { signPop } = useLogin()
  const { firebaseLaunch, firebasePromise, firebaseApp } = useFirebase()

  const [validAppData, setValidAppData] = useState(false)

  useEffect(() => {
    if (validAppData) {
      clearLoading()
    } else {
      queueLoading()
    }
  }, [clearLoading, queueLoading, validAppData])

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const appKey = queryParams.get('appKey')
    const appName = queryParams.get('appName')
    const appTheme = queryParams.get('appTheme')
    if (!appKey) {
      window.alert('No AppKey - No Page')
      router.push(`/app-website-builder`)
      return
    }
    firebasePromise.then(async () => {
      if (firebaseLaunch) {
        const fireUser = firebaseApp.auth().currentUser
        if (!fireUser) {
          addAlert('Please Login to Continue...', {
            variant: 'warning',
          })
          signPop()
          return
        }

        const keyCheck = await keyValidate(firebaseApp, appKey)
        if (!keyCheck) {
          addAlert('Upgrade your plan to create a new Website', {
            variant: 'danger',
            autoDismiss: false,
          })
          return
        }

        if (keyCheck.appName) {
          let appDataJson = {}
          try {
            const appData = await firebaseApp
              .storage()
              .ref(`public/${appKey}/bin/index.json`)
              .getDownloadURL()
            const appFetchData = await fetch(appData)
            appDataJson = await appFetchData.json()
          } catch (e) {
            // Ignore
          }
          Object.assign(keyCheck, appDataJson)
        }

        await Promise.all(
          ['appIcon', 'appBanner', 'appScreenshot-1', 'appScreenshot-2'].map(
            (appImageKey) => {
              const appImagePath = keyCheck[appImageKey]
              if (appImagePath) {
                return urlToFile(appImagePath).then((appImageFile) => {
                  if (appImageFile) {
                    keyCheck[appImageKey] = appImageFile
                  }
                })
              }
              return null
            }
          )
        )

        Object.assign(keyCheck, {
          appKey,
          appName: appName || keyCheck.appName,
          appTheme: appTheme || keyCheck.appTheme || 'gum',
        })

        setValidAppData(keyCheck)
      }
    })
  }, [
    firebaseApp,
    firebasePromise,
    firebaseLaunch,
    router,
    addAlert,
    signPop,
    queueLoading,
    clearLoading,
  ])

  return validAppData ? (
    <WebBuilderComponent appData={validAppData} isPreview />
  ) : (
    <WebBuilderPlaceholder />
  )
}
