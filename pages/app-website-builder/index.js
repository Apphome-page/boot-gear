import { useCallback } from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  InputGroup,
  Button,
  OverlayTrigger,
  Tooltip,
  Image,
} from 'react-bootstrap'
import Head from 'next/head'
import { useRouter } from 'next/router'

import IconInfo from '@svg-icons/bootstrap/info-circle.svg'

import { useLogin, useFirebase } from '../../components/Context/Login'
import { useAlerts } from '../../components/Context/Alert'
import { useLoading } from '../../components/Context/Loading'

import FAQ from '../../components/FAQ'

import keyValidate from '../../pageComponents/WebBuilder/helpers/keyValidate'

import faqList from '../../pageData/app-website-builder/faq.json'
import RadioImageButtons from '../../components/RadioImageButtons'

import THEMES from '../../config/websiteThemes.json'

export default function Website() {
  const router = useRouter()
  const { firebaseLaunch, firebasePromise, firebaseApp } = useFirebase()

  const { signPop } = useLogin()
  const { addAlert } = useAlerts()
  const { queueLoading, unqueueLoading } = useLoading()

  const keyValidateAction = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      const {
        appName: { value: appName },
        appTheme: { value: appTheme },
      } = event.target.elements
      const appKey = appName.replace(/\W/gi, '-').toLowerCase()
      if (!appName) {
        addAlert('Please provide appropriate appName', {
          variant: 'info',
        })
        return
      }
      if (!firebaseLaunch) {
        addAlert('Something went wrong... Please wait for a few moments.', {
          variant: 'info',
        })
        return
      }
      firebasePromise.then(async () => {
        const fireUser = firebaseApp.auth().currentUser
        if (!fireUser) {
          signPop()
          addAlert('Please provide appropriate appName', {
            variant: 'warning',
          })
          return
        }

        queueLoading()
        const keyCheck = await keyValidate(firebaseApp, appKey)
        unqueueLoading()
        if (!keyCheck) {
          addAlert(
            'Please Upgrade your existing plan to create a website for your plan!',
            {
              variant: 'danger',
              autoDismiss: false,
            }
          )
          return
        }
        router.push(
          `/dashboard/website-builder?appKey=${appKey}&appName=${appName}&appTheme=${appTheme}`
        )
      })
    },
    [
      addAlert,
      firebaseApp,
      firebaseLaunch,
      firebasePromise,
      queueLoading,
      router,
      signPop,
      unqueueLoading,
    ]
  )
  return (
    <>
      <Head>
        <title>
          App Website Builder - Create beautiful, responsive and feature rich
          website for your mobile apps
        </title>
        <meta
          name='description'
          content='Smart App Website Builder - Create app landing pages without learning web development and nuances of webhosting to create perfect landing pages for your apps.'
        />
        <meta
          property='og:title'
          content='App Website Builder - Create beautiful, responsive and feature rich app landing pages for your mobile apps'
        />
        <meta
          property='og:description'
          content='Smart App Website Builder - Create websites without learning web development and nuances of webhosting to create perfect app landing pages for your apps.'
        />
      </Head>
      <section className='hero min-vh-100 pb-5'>
        <Container>
          <Row>
            <Col>
              <h1 className='display-4 my-3 border-bottom py-3'>
                App website builder
              </h1>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Form onSubmit={keyValidateAction}>
                <Form.Row>
                  <Col className='d-inline-flex align-items-center'>
                    <span className='lead'>App Name</span>
                    <OverlayTrigger
                      placement='right'
                      overlay={
                        <Tooltip id='Tip for App Name'>
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
                </Form.Row>
                <Form.Row className='ml-3'>
                  <Col>
                    <InputGroup>
                      <FormControl name='appName' />
                    </InputGroup>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <hr />
                  </Col>
                </Form.Row>
                <Form.Row>
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
                </Form.Row>
                <Form.Row className='ml-3'>
                  <Col className='text-center'>
                    <RadioImageButtons name='appTheme' options={THEMES} />
                  </Col>
                </Form.Row>
                <Form.Row className='py-5'>
                  <Col />
                  <Col>
                    <Button
                      type='submit'
                      variant='success'
                      className='shadow rounded-0 w-100'
                    >
                      Continue
                    </Button>
                  </Col>
                </Form.Row>
              </Form>
            </Col>
            <Col lg={6}>
              <Image fluid src='/img/feature/web-landing.svg' className='p-3' />
            </Col>
          </Row>
        </Container>
      </section>
      {faqList.length ? (
        <Container fluid className='py-5'>
          <FAQ faqList={faqList} />
        </Container>
      ) : (
        ''
      )}
    </>
  )
}
