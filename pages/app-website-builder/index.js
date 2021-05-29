import { useCallback } from 'react'
import {
  Container,
  Form,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap'
import Head from 'next/head'
import { useRouter } from 'next/router'

import FAQ from '../../components/FAQ'
import { useFirebase } from '../../components/Context/Login'

import keyValidate from '../../pageComponents/WebBuilder/helpers/keyValidate'

import faqList from '../../pageData/app-website-builder/faq.json'

export default function Website() {
  const router = useRouter()
  const { firebaseLaunch, firebaseApp } = useFirebase()
  const keyValidateAction = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      const { value } = event.target.elements.appKey
      if (!firebaseLaunch) {
        window.alert('Please wait...')
        return
      }
      const fireUser = firebaseApp.auth().currentUser
      if (!fireUser) {
        window.alert('Please Login to continue...')
        return
      }
      if (!value) {
        window.alert('NO VALUE')
        return
      }
      const keyValue = value.replace(/\W/gi, '-').toLowerCase()
      const keyCheck = keyValidate(firebaseApp, keyValue)
      if (!keyCheck) {
        window.alert('Website already exists')
        return
      }
      router.push(`/dashboard/website-builder?appKey=${keyValue}`)
    },
    [firebaseApp, firebaseLaunch, router]
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
      <section className='hero min-vh-100 pt-3 pb-5'>
        <Container>
          <h1 className='display-4 py-3'>App website builder</h1>
          <Form onSubmit={keyValidateAction}>
            <Form.Group controlId='appKey'>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>App Name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl />
                <InputGroup.Append>
                  <Button variant='success' type='submit'>
                    Submit
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Form>
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
