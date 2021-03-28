import { useState, useContext, useCallback, useRef } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Form,
  FormControl,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import { InfoCircle as IconInfo } from '@emotion-icons/bootstrap/InfoCircle'

import { StoreContext as HeadContext } from '../../../utils/storeProvider'
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
  const [{ firebase, userAuth }, modStore] = useContext(HeadContext)
  const [
    { nextAction, prevAction, appTheme, appName },
    updateStore,
  ] = useContext(StoreContext)
  const [selectedTheme, setSelectedTheme] = useState(appTheme || THEMES[0].key)

  const userId = userAuth && userAuth.uid

  const nextBtnAction = useCallback(async () => {
    if (!userId) {
      modStore({ signPop: true })
      return
    }
    const formCurrent = formRef.current
    if (!formCurrent || !formCurrent.reportValidity()) {
      return
    }

    updateStore({ processing: true })
    modStore({ loadingPop: true })

    const formElements = formRef.current.elements
    const formName = formElements.namedItem('appName').value
    const appKey = formName.replace(/\W/gi, '-').toLowerCase()

    const { default: keyValidate } = await import('../helpers/keyValidate')
    const {
      status: keyValidated = false,
      text: keyText = '',
      data: keyData = {},
    } = await keyValidate(firebase, appKey, { userId })

    modStore({ loadingPop: false })
    if (!keyValidated) {
      updateStore({ processing: false })
      modStore({
        alertVariant: 'danger',
        alertTimeout: 10,
        alertText: keyText,
      })
      return
    }
    updateStore({
      ...keyData,
      appKey,
      appName: formName,
      appTheme: selectedTheme,
      processing: false,
    })
    nextAction()
  }, [userId, firebase, updateStore, selectedTheme, nextAction, modStore])

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
        <Row className='ml-3' onClick={themeBtnAction}>
          {THEMES.map(({ key, src }) => (
            <Col lg={6} className='py-3' key={key}>
              <Image
                src={src}
                data-theme={key}
                thumbnail
                className={`cursor-pointer${
                  selectedTheme === key ? ' border-warning shadow' : ''
                }`}
                style={{ borderWidth: '4px' }}
              />
            </Col>
          ))}
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
