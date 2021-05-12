/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */

import { renderToStaticMarkup } from 'react-dom/server'
import Compress from 'compress.js'

import WebBuilderContext from '../../../components/Context/WebBuilder'
import StoreContext from '../../../components/Context'

import uuid from '../../../utils/uuid'

import removeWebsite from '../../Dashboard/helpers/removeWebsite'

// import keyValidate from './keyValidate'
import getThemeComponent from './getThemeComponent'

const compress = new Compress()

const compressToBase64 = ([{ data, ext }]) =>
  Compress.convertBase64ToFile(data, ext)

const toSafeName = (name) => name.replace(/[^a-zA-Z0-9.]/gi, '-').toLowerCase()

const defaultFile =
  typeof window !== 'undefined' ? new File([], 'default.dat') : {}

export default async function upload(firebase, renderProps = {}) {
  // const appKeyData = await keyValidate(firebase, appKey)
  // if (!appKeyData) {
  //   return null
  // }

  // const userId = firebase.auth().currentUser.uid
  console.log('<<>> ', renderProps)
  const { appTheme, appKey } = renderProps
  const appIcon = renderProps.appIcon || defaultFile
  const appScreenshot = renderProps.appScreenshot || defaultFile

  const appIconPath = `/${appKey}/bin/${uuid('icon')}-${toSafeName(
    appIcon.name
  )}`
  const appScreenshotPath = `/${appKey}/bin/${uuid('scr')}-${toSafeName(
    appScreenshot.name
  )}`

  // const customMeta = {
  //   // cacheControl: 'public,max-age=300',
  //   // Update ownership
  //   customMetadata: {
  //     owner: userId,
  //   },
  // }

  // Render Template

  // TODO: Clean Props
  const renderContextProps = {
    ...renderProps,
    // Replace Editors with Content
    isPreview: false,
    // Use Actual Image Path instead of File-URI
    appIcon: appIconPath,
    appScreenshot: appScreenshotPath,
  }
  renderContextProps.appTestim = (renderContextProps.appTestim || []).reduce(
    (tAccumulator, testimonial) => {
      if (!testimonial || !testimonial.text) {
        return tAccumulator
      }
      return tAccumulator.concat(testimonial)
    },
    []
  )
  const { HeadComponent, BodyComponent } = getThemeComponent(appTheme)
  const renderHTMLHead = renderToStaticMarkup(
    <StoreContext value={{ isPreview: false, theme: appTheme }}>
      <WebBuilderContext value={renderProps}>
        <HeadComponent />
      </WebBuilderContext>
    </StoreContext>
  )
  const renderHTMLBody = renderToStaticMarkup(
    <StoreContext value={{ isPreview: false, theme: appTheme }}>
      <WebBuilderContext value={renderProps}>
        <BodyComponent />
      </WebBuilderContext>
    </StoreContext>
  )

  const renderHTMLData = `<!DOCTYPE html><html lang="en"><head>${renderHTMLHead}</head><body>${renderHTMLBody}</body></html>`

  return renderHTMLData

  const renderIconData = compress
    .compress([appIcon], {
      size: 1,
      quality: 0.75,
      maxWidth: 128,
      maxHeight: 128,
      resize: true,
    })
    .then(compressToBase64)

  const renderScreenshotData = compress
    .compress([appScreenshot], {
      size: 2,
      quality: 0.75,
      maxWidth: 720,
      maxHeight: 720,
      resize: true,
    })
    .then(compressToBase64)

  // Remove Older Data
  await removeWebsite({
    firebase,
    webKey: appKey,
    removeDomain: false,
    removeStorage: true,
  })

  // Update Firebase DB with current Action
  const DBPromise = firebase
    .database()
    .ref(`users/${userId}/sites/${appKey}`)
    .set({
      ...appKeyData,
      appKey,
      timestamp: new Date().getTime(),
    })

  // Update file in storage
  const HTMLPromise = firebase
    .storage()
    .ref(`public/${appKey}/index.html`)
    .putString(renderHTMLData, 'raw', {
      ...customMeta,
      contentType: 'text/html; charset=utf-8',
    })
  const JSONPromise = firebase
    .storage()
    .ref(`public/${appKey}/index.json`)
    .putString(renderProps, 'raw', {
      ...customMeta,
      contentType: 'application/json; charset=utf-8',
    })

  // Compress & Upload Icon
  const IconPromise = renderIconData.then((file) =>
    firebase.storage().ref(`public/${appIconPath}`).put(file, customMeta)
  )

  // Compress & Upload Screenshot
  const ScreenshotPromise = renderScreenshotData.then((file) =>
    firebase.storage().ref(`public/${appScreenshotPath}`).put(file, customMeta)
  )

  // Wait till everything uploads
  await Promise.all([
    DBPromise,
    HTMLPromise,
    JSONPromise,
    IconPromise,
    ScreenshotPromise,
  ])

  return {
    status: true,
  }
}
