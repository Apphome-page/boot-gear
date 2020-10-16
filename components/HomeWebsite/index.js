/* eslint-disable no-alert */
import { useState, useContext, useCallback, useRef } from 'react'
import {
  Container,
  InputGroup,
  Form,
  FormFile,
  FormControl,
  Button,
  Row,
  Col,
} from 'react-bootstrap'

import { StoreContext } from '../../utils/storeProvider'

import { Hero, HeroImage } from './style'

export default function HomeWebsite() {
  const formRef = useRef(null)
  const [{ firebase, userAuth }, modStore] = useContext(StoreContext)
  const userId = userAuth && userAuth.uid

  const [templateProps, setTemplateProps] = useState({
    appIcon: null,
    appName: '',
    appDescription: '',
    appScreenshot: null,
    appLink: '',
    appAndroidLink: '',
    appEmailLink: '',
    appTwitterLink: '',
    appFacebookLink: '',
  })

  const modTemplateProps = useCallback((deltaProps) => {
    setTemplateProps((prevProps) => {
      return { ...prevProps, ...deltaProps }
    })
  }, [])

  const actionUpload = useCallback(async () => {
    if (!userId) {
      modStore({ signPop: true })
      return
    }
    if (!formRef.current.reportValidity()) {
      return
    }
    const { appName, appIcon, appScreenshot } = templateProps
    const appKey = appName.replace(/\W/gi, '-')

    const storagePath = `public/${appKey}/index.html`
    const databasePath = `users/${userId}/sites/${appKey}`

    const storageRef = firebase.storage().ref(storagePath)
    const databaseRef = firebase.database().ref(databasePath)

    // 1. User Limit
    const userSitesPromise = await firebase
      .database()
      .ref(`users/${userId}/sites`)
      .once('value')
    const userSites = userSitesPromise.val() || {}
    delete userSites[appKey]

    // 2. Path is accessible || User Owns Path
    const snapshot = await databaseRef.once('value')
    const { timeStamp: userWebsite } = snapshot.val() || {}
    let freeWebsitePath = true
    try {
      const {
        customMetadata: { owner },
      } = await storageRef.getMetadata()
      freeWebsitePath = !owner || owner === userId
    } catch (e) {
      // Path Does not exist
    }

    // EXIT: Already owns 1 Website || Path is inaccessible
    if (Object.keys(userSites).length > 0) {
      alert(`You already have 1 website hosted: ${Object.keys(userSites)}`)
      return
    }
    if (!(freeWebsitePath || userWebsite)) {
      alert(`${appKey} is already taken`)
      return
    }

    const customMeta = {
      // cacheControl: 'public,max-age=300',
      customMetadata: {
        owner: userId,
      },
    }

    try {
      // Update file in storage
      const renderTemplate = await import('../../helpers/homeWebsite')
      await storageRef.putString(
        renderTemplate({ ...templateProps, appKey }),
        'raw',
        {
          ...customMeta,
          contentType: 'text/html; charset=utf-8',
        }
      )
      firebase
        .storage()
        .ref(`public/${appKey}/bin/${appIcon.name}`)
        .put(appIcon, customMeta)
      firebase
        .storage()
        .ref(`public/${appKey}/bin/${appScreenshot.name}`)
        .put(appScreenshot, customMeta)
      // Update ownership
      await databaseRef.set({
        timeStamp: new Date().getTime(),
      })
    } catch (e) {
      alert('Something went wrong while updating your website.')
    }
  }, [firebase, modStore, templateProps, userId])

  return (
    <>
      <Hero>
        <Container className='py-5'>
          <Row>
            <Col lg={6}>
              <h1 className='display-4 py-5'>App Website Generator</h1>
              <Form ref={formRef}>
                <InputGroup className='my-1'>
                  <InputGroup.Prepend>
                    <InputGroup.Text>App Name</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    onChange={(e) => {
                      modTemplateProps({ appName: e.target.value })
                    }}
                  />
                </InputGroup>
                <FormFile
                  accept='image/*'
                  required
                  label='Attach App Icon'
                  custom
                  onChange={(e) => {
                    if (e.target.files.length < 1) {
                      return
                    }
                    modTemplateProps({
                      appIcon: e.target.files[0],
                    })
                  }}
                />
                <hr />
                <InputGroup className='my-1'>
                  <InputGroup.Prepend>
                    <InputGroup.Text>App Description</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    as='textarea'
                    rows='1'
                    onChange={(e) => {
                      modTemplateProps({ appDescription: e.target.value })
                    }}
                  />
                </InputGroup>
                <FormFile
                  accept='image/*'
                  required
                  label='Attach App Screenshot'
                  custom
                  onChange={(e) => {
                    if (e.target.files.length < 1) {
                      return
                    }
                    modTemplateProps({
                      appScreenshot: e.target.files[0],
                    })
                  }}
                />
                <hr />
                <InputGroup className='my-1'>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Play Store Link</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    onChange={(e) => {
                      modTemplateProps({ appAndroidLink: e.target.value })
                    }}
                  />
                </InputGroup>
                <InputGroup className='my-1'>
                  <InputGroup.Prepend>
                    <InputGroup.Text>App Store (Apple) Link</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    onChange={(e) => {
                      modTemplateProps({ appLink: e.target.value })
                    }}
                  />
                </InputGroup>
                <hr />
                <InputGroup className='my-1'>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Facebook</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    onChange={(e) => {
                      modTemplateProps({ appFacebookLink: e.target.value })
                    }}
                  />
                </InputGroup>{' '}
                <InputGroup className='my-1'>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Twitter</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    onChange={(e) => {
                      modTemplateProps({ appTwitterLink: e.target.value })
                    }}
                  />
                </InputGroup>
                <InputGroup className='my-1'>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Email</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    type='email'
                    onChange={(e) => {
                      modTemplateProps({ appEmailLink: e.target.value })
                    }}
                  />
                </InputGroup>
                <hr />
                <Form.Row>
                  <Col>
                    <FormControl
                      required
                      type='reset'
                      value='Reset'
                      className='btn btn-info w-100'
                    />
                  </Col>
                  <Col>
                    <Button
                      onClick={actionUpload}
                      variant='success'
                      className='w-100'
                    >
                      Create Website
                    </Button>
                  </Col>
                </Form.Row>
              </Form>
            </Col>
          </Row>
        </Container>
        <HeroImage className='d-lg-block d-none' />
      </Hero>
    </>
  )
}
