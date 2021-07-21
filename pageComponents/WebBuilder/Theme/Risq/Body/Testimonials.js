import { Fragment, memo } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

import TextEditor from '../../../components/Editor/Text'

const textEditorButtons = []

const Testimonial = ({ appTestimonialIndex }) => (
  <Col lg={6}>
    <blockquote className='p-3 shadow'>
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
  const [appTestimonial4Text] = useWebBuilderContext(`appTestimonial-4-text`)

  if (
    !isPreview &&
    !appTestimonial1Text &&
    !appTestimonial2Text &&
    !appTestimonial3Text &&
    !appTestimonial4Text
  ) {
    return <Container id='container-testimonials' />
  }

  return (
    <Container id='container-testimonials' className={className} style={style}>
      <Row className='text-center'>
        <Col>
          <span className='d-block p-3 lead text-uppercase text-black-50'>
            Testimonials
          </span>
        </Col>
      </Row>
      <Row className='row list-unstyled'>
        {[
          appTestimonial1Text,
          appTestimonial2Text,
          appTestimonial3Text,
          appTestimonial4Text,
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
