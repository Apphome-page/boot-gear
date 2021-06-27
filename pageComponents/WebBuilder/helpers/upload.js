import { renderToStaticMarkup } from 'react-dom/server'
import Compress from 'compress.js'
import fetch from 'cross-fetch'

import WebBuilderContext from '../../../components/Context/WebBuilder'
import StoreContext from '../../../components/Context'

import uuid from '../../../utils/uuid'

import removeWebsite from '../../Dashboard/helpers/removeWebsite'

import keyValidate from './keyValidate'
import getThemeComponent from './getThemeComponent'

const FIRECLOUD_DOMAIN_CONNECT =
  process.env.NEXT_PUBLIC_FIRECLOUD_DOMAIN_CONNECT

const compress = new Compress()

const compressToBase64 = ([{ data, ext }]) =>
  Compress.convertBase64ToFile(data, ext)

// const toSafeName = (name) => name.replace(/[^a-zA-Z0-9.]/gi, '-').toLowerCase()

const defaultFile =
  typeof window !== 'undefined' ? new File([], 'default.dat') : {}

export default async function upload(firebase, renderProps = {}) {
  const {
    appGA,
    appTheme,
    appKey,
    appName,
    appTitle,
    appIcon = defaultFile,
    appBanner,
    appTnC,
    appPP,
    'appScreenshot-1': appScreenshot1,
    'appScreenshot-2': appScreenshot2,
  } = renderProps

  const appKeyData = await keyValidate(firebase, appKey)
  if (!appKeyData) {
    return null
  }

  const userId = firebase.auth().currentUser.uid

  const appIconPath = `/${appKey}/${uuid('icon')}.dat`
  const appBannerPath = appBanner ? `/${appKey}/${uuid('banner')}.dat` : null
  const appScreenshot1Path = appScreenshot1
    ? `/${appKey}/${uuid('scr-1')}.dat`
    : null
  const appScreenshot2Path = appScreenshot2
    ? `/${appKey}/${uuid('scr-2')}.dat`
    : null

  const renderPropsContext = {
    ...renderProps,
    appIcon: appIconPath,
    appBanner: appBannerPath,
    'appScreenshot-1': appScreenshot1Path,
    'appScreenshot-2': appScreenshot2Path,
  }

  const customMeta = {
    // cacheControl: 'public,max-age=300',
    // Update ownership
    customMetadata: {
      owner: userId,
    },
  }

  const { HeadComponent, BodyComponent } = getThemeComponent(appTheme)
  const renderHTMLHead = renderToStaticMarkup(
    <StoreContext value={{ isPreview: false }}>
      <WebBuilderContext value={renderPropsContext}>
        <HeadComponent />
      </WebBuilderContext>
    </StoreContext>
  )
  const renderHTMLBody = renderToStaticMarkup(
    <StoreContext value={{ isPreview: false }}>
      <WebBuilderContext value={renderPropsContext}>
        <BodyComponent />
      </WebBuilderContext>
    </StoreContext>
  )
  const renderHTMLTnC = renderToStaticMarkup(
    <StoreContext value={{ isPreview: false }}>
      <WebBuilderContext value={renderPropsContext}>
        <BodyComponent>
          <div className='container p-3'>
            <h1>Terms & Conditions</h1>
            <br />
            {appTnC}
          </div>
        </BodyComponent>
      </WebBuilderContext>
    </StoreContext>
  )
  const renderHTMLPP = renderToStaticMarkup(
    <StoreContext value={{ isPreview: false }}>
      <WebBuilderContext value={renderPropsContext}>
        <BodyComponent>
          <div className='container p-3'>
            <h1>Privacy Policy</h1>
            <br />
            {appPP}
          </div>
        </BodyComponent>
      </WebBuilderContext>
    </StoreContext>
  )

  const renderHTMLData = `<!DOCTYPE html><html lang="en"><head>${renderHTMLHead}</head><body>${renderHTMLBody}</body></html>`
  const renderHTMLTnCData = `<!DOCTYPE html><html lang="en"><head>${renderHTMLHead}</head><body>${renderHTMLTnC}</body></html>`
  const renderHTMLPPData = `<!DOCTYPE html><html lang="en"><head>${renderHTMLHead}</head><body>${renderHTMLPP}</body></html>`

  const renderIconData = compress
    .compress([appIcon], {
      size: 1,
      quality: 0.75,
      maxWidth: 128,
      maxHeight: 128,
      resize: true,
    })
    .then(compressToBase64)

  const renderImageData = Promise.all(
    [appBanner, appScreenshot1, appScreenshot2].map((appFile) => {
      if (!appFile) {
        return null
      }
      return compress
        .compress([appFile], {
          size: 2,
          quality: 0.75,
          maxHeight: 720,
          maxWidth: 720,
          resize: true,
        })
        .then(compressToBase64)
    })
  )

  // Remove Older Data
  await removeWebsite({
    firebase,
    webKey: appKey,
    removeDomain: false,
    removeStorage: true,
  })

  // Update Firebase DB with current Action
  // TODO: Cleanup while re-uploading
  const DBPromise = firebase
    .database()
    .ref(`users/${userId}/sites/${appKey}`)
    .set({
      ...appKeyData,
      appGA,
      appName,
      appTitle,
      appIcon: appIconPath,
      timestamp: new Date().getTime(),
    })

  // Update file in storage
  const HTMLPromise = Promise.all([
    firebase
      .storage()
      .ref(`public/${appKey}/index.html`)
      .putString(renderHTMLData, 'raw', {
        ...customMeta,
        contentType: 'text/html; charset=utf-8',
      }),
    firebase
      .storage()
      .ref(`public/${appKey}/terms-and-conditions.html`)
      .putString(renderHTMLTnCData, 'raw', {
        ...customMeta,
        contentType: 'text/html; charset=utf-8',
      }),
    firebase
      .storage()
      .ref(`public/${appKey}/privacy-policy.html`)
      .putString(renderHTMLPPData, 'raw', {
        ...customMeta,
        contentType: 'text/html; charset=utf-8',
      }),
  ])

  const JSONPromise = firebase
    .storage()
    .ref(`public/${appKey}/index.json`)
    .putString(
      JSON.stringify({
        ...renderProps,
        appIcon: appIconPath,
        appBanner: appBannerPath,
        'appScreenshot-1': appScreenshot1Path,
        'appScreenshot-2': appScreenshot2Path,
      }),
      'raw',
      {
        ...customMeta,
        contentType: 'application/json; charset=utf-8',
      }
    )

  // Compress & Upload Icon
  const IconPromise = renderIconData.then((file) =>
    firebase.storage().ref(`public/${appIconPath}`).put(file, customMeta)
  )

  // Compress & Upload Image Files
  const ImagePromise = renderImageData.then(
    ([appBannerData, appScreenshot1Data, appScreenshot2Data]) => {
      const imagePromiseArray = []
      if (appBannerData) {
        imagePromiseArray.push(
          firebase
            .storage()
            .ref(`public/${appBannerPath}`)
            .put(appBannerData, customMeta)
        )
      }
      if (appScreenshot1Data) {
        imagePromiseArray.push(
          firebase
            .storage()
            .ref(`public/${appScreenshot1Path}`)
            .put(appScreenshot1Data, customMeta)
        )
      }
      if (appScreenshot2Data) {
        imagePromiseArray.push(
          firebase
            .storage()
            .ref(`public/${appScreenshot2Path}`)
            .put(appScreenshot2Data, customMeta)
        )
      }
      return Promise.all(imagePromiseArray)
    }
  )

  // Wait till everything uploads
  await Promise.all([
    DBPromise,
    HTMLPromise,
    JSONPromise,
    IconPromise,
    ImagePromise,
  ])

  // Check if S3 update is required
  const userWebDataListener = await firebase
    .database()
    .ref(`users/${userId}/sites/${appKey}`)
    .once('value')
  const { webZone, webBucket } = (await userWebDataListener.val()) || {}
  // Update S3
  if (webZone && webBucket) {
    const idToken = await firebase.auth().currentUser.getIdToken()
    const connectResp = await fetch(FIRECLOUD_DOMAIN_CONNECT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        webKey: appKey,
      }),
    })
    const setupData = await connectResp.json()
    if (connectResp.status >= 400) {
      throw new Error(`Something went wrong. ${JSON.stringify(setupData)}`)
    }
  }

  return {
    status: true,
  }
}
