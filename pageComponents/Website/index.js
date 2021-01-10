import { useState, useContext, useCallback, useEffect, useRef } from 'react'
import {
  InputGroup,
  Form,
  FormFile,
  FormControl,
  Button,
  Col,
} from 'react-bootstrap'
import { useRouter } from 'next/router'
import debounce from 'lodash/debounce'

import { StoreContext } from '../../utils/storeProvider'

import uploadWebsite from './helpers/upload'

export default function HomeWebsite({ initProps = {} }) {
  const formRef = useRef(null)
  const [{ firebase, userAuth }, modStore] = useContext(StoreContext)
  const router = useRouter()
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
    ...initProps,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const modTemplateProps = useCallback(
    debounce((deltaProps) => {
      setTemplateProps((prevProps) => {
        return { ...prevProps, ...deltaProps }
      })
    }),
    []
  )

  const actionUpload = useCallback(async () => {
    if (!userId) {
      modStore({ signPop: true })
      return
    }
    if (!formRef.current.reportValidity()) {
      return
    }
    const appKey = templateProps.appName.replace(/\W/gi, '-').toLowerCase()
    if (!appKey) {
      window.alert('Please provide a valid App Name')
      return
    }

    try {
      await uploadWebsite(firebase, userId, appKey, templateProps)
      // TODO: if custom domain is set, update s3 bucket (call verifyDomain)
      formRef.current.reset()
      window.alert(
        `Your website is generated!\nVisit your website at: https://applanding.page/${appKey}`
      )
      router.push('/dashboard')
      window.open(`https://applanding.page/${appKey}`, '_blank')
    } catch (e) {
      window.alert('Something went wrong while updating your website.')
    }
  }, [firebase, modStore, router, templateProps, userId])

  useEffect(() => {
    modTemplateProps(initProps)
  }, [initProps, modTemplateProps])

  return (
    <Form ref={formRef}>
      <InputGroup className='my-1'>
        <InputGroup.Prepend>
          <InputGroup.Text>App Name</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          required
          readOnly={!!initProps.appName}
          disabled={!!initProps.appName}
          defaultValue={templateProps.appName}
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
          defaultValue={templateProps.appDescription}
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
          defaultValue={templateProps.appAndroidLink}
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
          defaultValue={templateProps.appLink}
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
          defaultValue={templateProps.appFacebookLink}
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
          defaultValue={templateProps.appTwitterLink}
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
          defaultValue={templateProps.appEmailLink}
          onChange={(e) => {
            modTemplateProps({ appEmailLink: e.target.value })
          }}
        />
      </InputGroup>
      <hr />
      <Form.Row>
        <Col>
          <Button
            variant='info'
            className='w-100'
            onClick={() => {
              setTemplateProps({})
              formRef.current.reset()
            }}
          >
            Reset
          </Button>
        </Col>
        <Col>
          <Button onClick={actionUpload} variant='success' className='w-100'>
            Create Website
          </Button>
        </Col>
      </Form.Row>
    </Form>
  )
}
