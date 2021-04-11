import { useState, useCallback, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import FAQ from '../../components/FAQ'
import { useLoading } from '../../components/LoadingPop'
import useUserData from '../../components/LoginPop/useUserData'

import faqList from '../../pageData/app-website-builder/faq.json'

const WebsiteBuilder = dynamic(() => import('../../pageComponents/Website'), {
  ssr: false,
})

export default function Website() {
  const { query: { webEdit = '' } = {} } = useRouter()

  const [webEditData, setWebEditData] = useState(null)

  const { queueLoading, unqueueLoading, clearLoading } = useLoading()
  // TODO: Optional Call on basis of webEdit
  const { firstPromise: userFirstDataPromise, data: userData } = useUserData()

  const preloadSiteData = useCallback(
    async (editKey) => {
      if (!editKey) {
        return setWebEditData({})
      }
      queueLoading()
      await userFirstDataPromise
      unqueueLoading()
      return setWebEditData(
        (userData && userData.sites && userData.sites[editKey]) || {}
      )
    },
    [queueLoading, unqueueLoading, userData, userFirstDataPromise]
  )

  useEffect(() => {
    preloadSiteData(webEdit)
    return () => {
      clearLoading()
      setWebEditData(null)
    }
  }, [preloadSiteData, clearLoading, webEdit])

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
          {webEditData ? (
            <div className='lead border-bottom lead my-1'>
              Editing{' '}
              <a
                href={`/${webEdit}`}
                className='text-decoration-none text-white-50'
              >
                {webEdit}
              </a>
            </div>
          ) : (
            <></>
          )}
        </Container>
        {webEditData ? (
          <WebsiteBuilder className='ml-auto' initProps={webEditData} />
        ) : (
          <></>
        )}
      </section>
      {faqList.length ? (
        <Container fluid className='py-5'>
          <FAQ faqList={faqList} />
        </Container>
      ) : (
        <></>
      )}
    </>
  )
}
