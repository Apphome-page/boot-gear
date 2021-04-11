import { useState, useCallback } from 'react'
import {
  Carousel,
  CarouselItem,
  Container,
  Row,
  Col,
  Image,
} from 'react-bootstrap'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import WebStore from './helpers/store'
import Progress from './steps/progress'

// TODO: Use formik for multi-staging
const STEPS = [
  dynamic(() => import('./steps/1')),
  dynamic(() => import('./steps/2')),
  dynamic(() => import('./steps/3')),
  dynamic(() => import('./steps/4')),
  dynamic(() => import('./steps/5')),
  dynamic(() => import('./steps/6')),
  dynamic(() => import('./steps/7')),
]

export default function HomeWebsite({ initProps = {} }) {
  const router = useRouter()
  const [activeSlide, setActiveSlide] = useState(() =>
    parseInt(router.query.webStep || 0, 10)
  )

  const nextAction = useCallback(() => {
    window.scrollTo(0, 0)
    setActiveSlide((prevSlide) => {
      const newSlide = prevSlide < STEPS.length - 1 ? prevSlide + 1 : prevSlide
      if (newSlide !== prevSlide) {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, webStep: newSlide },
        })
      }
      return newSlide
    })
  }, [router, setActiveSlide])

  const prevAction = useCallback(() => {
    window.scrollTo(0, 0)
    setActiveSlide((prevSlide) => {
      const newSlide = prevSlide > 0 ? prevSlide - 1 : prevSlide
      if (newSlide !== prevSlide) {
        router.replace({
          pathname: router.pathname,
          query: { ...router.query, webStep: newSlide },
        })
      }
      return newSlide
    })
  }, [router, setActiveSlide])

  return (
    <WebStore
      store={{
        ...initProps,
        maxSlide: STEPS.length - 1,
        nextAction,
        prevAction,
        setActiveSlide,
      }}
    >
      <Container>
        <Row className='my-3'>
          <Col>
            <Progress activeIndex={activeSlide} />
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Carousel
              activeIndex={activeSlide}
              interval={null}
              keyboard={false}
              controls={false}
              indicators={false}
              pause={false}
              touch={false}
              wrap={false}
              slide
            >
              {STEPS.map((Step, stepIndex) => (
                <CarouselItem key={stepIndex}>
                  <Step />
                </CarouselItem>
              ))}
            </Carousel>
          </Col>
          <Col lg={6}>
            <Image fluid src='/img/feature/web-landing.svg' className='p-3' />
          </Col>
        </Row>
      </Container>
    </WebStore>
  )
}
