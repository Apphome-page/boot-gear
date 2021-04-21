import { useState, useContext, useCallback, useRef } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import noop from 'lodash/noop'

import classNames from 'classnames'

import IconInfo from '@svg-icons/bootstrap/info-circle.svg'

import { useAlerts } from '../../../components/AlertPop'
import { useLoading } from '../../../components/LoadingPop'
import {
  useLogin,
  useFirebaseApp,
  useUserAuth,
} from '../../../components/LoginPop'

import Image from '../../../components/ImageTag'

import { StoreContext } from '../helpers/store'

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

  const { signPop } = useLogin()
  const [
    { nextAction, prevAction, appTheme, appName },
    updateStore,
  ] = useContext(StoreContext)

  const [selectedTheme, setSelectedTheme] = useState(appTheme || THEMES[0].key)

  const { addAlert } = useAlerts()
  const { queueLoading, unqueueLoading } = useLoading()

  const firebaseApp = useFirebaseApp()
  const userAuth = useUserAuth()
  const userId = userAuth && userAuth.uid

  const nextBtnAction = useCallback(
    async (event) => {
      event.preventDefault()
      event.stopPropagation()
      if (!userId) {
        signPop()
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
      } = await keyValidate(firebaseApp, appKey, { userId })

      unqueueLoading()
      if (!keyValidated) {
        addAlert(keyText, {
          variant: 'danger',
          autoDismiss: false,
        })
        return
      }
      updateStore({
        appKey,
        appName: formName,
        appTheme: selectedTheme,
      })
      nextAction()
    },
    [
      addAlert,
      firebaseApp,
      nextAction,
      queueLoading,
      selectedTheme,
      signPop,
      unqueueLoading,
      updateStore,
      userId,
    ]
  )

  const themeBtnAction = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      const dataTheme = event.target.dataset.theme
      if (dataTheme) {
        setSelectedTheme(dataTheme)
      }
    },
    [setSelectedTheme]
  )

  return (
    <form ref={formRef} className='form-wrap-step-1' onSubmit={noop}>
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
                height='16'
                width='16'
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
                height='16'
                width='16'
                className='ml-1 text-white-50 cursor-pointer'
              />
            </OverlayTrigger>
          </Col>
        </Row>
        <Row className='ml-3'>
          <Col onClick={themeBtnAction}>
            {THEMES.map(({ key, src }) => (
              <div
                key={key}
                className={classNames(
                  'icon-theme',
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
                  src={src}
                  width='200'
                  height='105'
                  className='m-0 p-0'
                  data-theme={key}
                />
              </div>
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
      <style jsx>
        {`
          .form-wrap-step-1 .icon-theme {
            border-width: 4px !important;
          }
        `}
      </style>
    </form>
  )
}
