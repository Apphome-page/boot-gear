import { useState, useCallback } from 'react'
import {
  Carousel,
  CarouselItem,
  Container,
  Row,
  Col,
  Image,
} from 'react-bootstrap'
import { useRouter } from 'next/router'

import WebStore from './helpers/store'
import Progress from './steps/progress'
import Step1 from './steps/1'
import Step2 from './steps/2'
import Step3 from './steps/3'
import Step4 from './steps/4'
import Step5 from './steps/5'
import Step6 from './steps/6'
import Step7 from './steps/7'

// TODO: Use formik for multi-staging
const STEPS = [Step1, Step2, Step3, Step4, Step5, Step6, Step7]

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
        processing: false,
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
            <Image src='/img/feature/web-landing.svg' className='p-3' />
          </Col>
        </Row>
      </Container>
    </WebStore>
  )
}
