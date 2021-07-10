import { Fragment, memo } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import IconQuote from '@svg-icons/bootstrap/chat-left-quote.svg'
import IconCrop from '@svg-icons/bootstrap/crop.svg'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

import TextEditor from '../../../components/Editor/Text'

const textEditorButtons = []

const Testimonial = ({ appTestimonialIndex }) => (
  <Col>
    <blockquote className='p-3 shadow'>
      <IconCrop height='24' width='24' className='mb-3' />
      <TextEditor
        keyName={`appTestimonial-${appTestimonialIndex}-text`}
        className='mb-0'
        buttons={textEditorButtons}
        placeholderText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      />
      <cite className='d-flex font-weight-bold'>
        <div className='ml-3 mr-1 font-weight-light'>-</div>
        <TextEditor
          keyName={`appTestimonial-${appTestimonialIndex}-source`}
          buttons={textEditorButtons}
          placeholderText='De finibus'
        />
      </cite>
    </blockquote>
  </Col>
)

const TestimonialMemo = memo(Testimonial)

export default function Testimonials({ className = '', style = {} }) {
  const [{ isPreview }] = useContextStore()
  const [appTestimonial1Text] = useWebBuilderContext(`appTestimonial-1-text`)
  const [appTestimonial2Text] = useWebBuilderContext(`appTestimonial-2-text`)
  const [appTestimonial3Text] = useWebBuilderContext(`appTestimonial-3-text`)

  if (
    !isPreview &&
    !appTestimonial1Text &&
    !appTestimonial2Text &&
    !appTestimonial3Text
  ) {
    return <Container id='container-testimonials' />
  }

  return (
    <Container id='container-testimonials' className={className} style={style}>
      <Row>
        <Col>
          <h2 className='my-5 display-4 font-weight-bold text-center'>
            Testimonials
            <IconQuote
              height='48'
              width='48'
              className='mx-3 d-inline-block text-primary'
            />
          </h2>
        </Col>
      </Row>
      <Row lg={3} className='row list-unstyled'>
        {[
          appTestimonial1Text,
          appTestimonial2Text,
          appTestimonial3Text,
        ].map((appTestinomial, appTestimonialIndex) =>
          isPreview || appTestinomial ? (
            <TestimonialMemo
              key={appTestimonialIndex}
              appTestimonialIndex={appTestimonialIndex + 1}
            />
          ) : (
            <Fragment key={appTestimonialIndex} />
          )
        )}
      </Row>
    </Container>
  )
}
