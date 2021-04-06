import { useState, useContext, useCallback, useRef } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormControl,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import { useFirebaseApp } from 'reactfire'
import { useToasts } from 'react-toast-notifications'

import Image from 'next/image'
import classNames from 'classnames'

import { InfoCircle as IconInfo } from '@emotion-icons/bootstrap/InfoCircle'

import imageLoader from '../../../utils/imageLoader'
import { StoreContext as HeadContext } from '../../../utils/storeProvider'
import { StoreContext } from '../helpers/store'

import { ThemeImage } from '../style'

const THEMES = [
  {
    key: 'gum',
    src: '/img/template/gum.jpg',
  },
  {
    key: 'wave',
    src: '/img/template/wave.jpg',
  },
  {
    key: 'grass',
    src: '/img/template/grass.jpg',
  },
]

export default function Step() {
  const formRef = useRef(null)

  const [{ queueLoading, unqueueLoading }, modStore] = useContext(HeadContext)
  const [
    { nextAction, prevAction, appTheme, appName },
    updateStore,
  ] = useContext(StoreContext)

  const [selectedTheme, setSelectedTheme] = useState(appTheme || THEMES[0].key)

  const { addToast } = useToasts()

  const firebase = useFirebaseApp()
  const { uid: userId } = firebase.auth().currentUser || {}

  const nextBtnAction = useCallback(async () => {
    if (!userId) {
      modStore({ signPop: true })
      return
    }
    const formCurrent = formRef.current
    if (!formCurrent || !formCurrent.reportValidity()) {
      return
    }

    queueLoading()

    const formElements = formRef.current.elements
    const formName = formElements.namedItem('appName').value
    const appKey = formName.replace(/\W/gi, '-').toLowerCase()

    const { default: keyValidate } = await import('../helpers/keyValidate')
    const {
      status: keyValidated = false,
      text: keyText = '',
      data: keyData = {},
    } = await keyValidate(firebase, appKey, { userId })

    unqueueLoading()
    if (!keyValidated) {
      addToast(keyText, {
        appearance: 'error',
      })
      return
    }
    updateStore({
      ...keyData,
      appKey,
      appName: formName,
      appTheme: selectedTheme,
    })
    nextAction()
  }, [
    addToast,
    firebase,
    modStore,
    nextAction,
    queueLoading,
    selectedTheme,
    unqueueLoading,
    updateStore,
    userId,
  ])

  const themeBtnAction = useCallback(
    ({
      target: {
        dataset: { theme: dataTheme },
      },
    }) => {
      if (dataTheme) {
        setSelectedTheme(dataTheme)
      }
    },
    [setSelectedTheme]
  )

  return (
    <Form ref={formRef}>
      <Container fluid>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>AppName</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppName'>
                  Unique identifier for your app
                </Tooltip>
              }
            >
              <IconInfo
                size='16'
                className='ml-1 text-white-50 cursor-pointer'
              />
            </OverlayTrigger>
          </Col>
        </Row>
        <Row className='ml-3'>
          <Col>
            <InputGroup className='my-3'>
              <FormControl
                id='appName'
                name='appName'
                required
                autoComplete='false'
                autoCorrect='false'
                defaultValue={appName}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>Theme</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  Theme for your App Website
                </Tooltip>
              }
            >
              <IconInfo
                size='16'
                className='ml-1 text-white-50 cursor-pointer'
              />
            </OverlayTrigger>
          </Col>
        </Row>
        <Row className='ml-3'>
          <Col onClick={themeBtnAction}>
            {THEMES.map(({ key, src }) => (
              <ThemeImage
                key={key}
                className={classNames(
                  'd-inline-flex',
                  'm-1',
                  'p-0',
                  'border',
                  'rounded',
                  'cursor-pointer',
                  'bg-light',
                  {
                    'border-warning': selectedTheme === key,
                    shadow: selectedTheme === key,
                  }
                )}
              >
                <Image
                  loader={imageLoader}
                  src={src}
                  width='200'
                  height='105'
                  className='m-0 p-0'
                  data-theme={key}
                />
              </ThemeImage>
            ))}
          </Col>
        </Row>
        <Row className='py-5'>
          <Col>
            <Button
              variant='light'
              onClick={prevAction}
              className='shadow rounded-0 w-100'
            >
              Back
            </Button>
          </Col>
          <Col>
            <Button
              variant='success'
              onClick={nextBtnAction}
              className='shadow rounded-0 w-100'
            >
              Next
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  )
}
