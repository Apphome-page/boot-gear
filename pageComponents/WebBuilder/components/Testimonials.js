import { Fragment, memo } from 'react'

import { useWebBuilderContext } from '../../../components/Context/WebBuilder'
import { useContextStore } from '../../../components/Context'

import TextEditor from './Editor/Text'

const textEditorButtons = []

const Testimonial = ({ appTestimonialIndex }) => (
  <li className='col-lg-6'>
    <blockquote className='blockquote'>
      <TextEditor
        keyName={`appTestimonial-${appTestimonialIndex}-text`}
        className='mb-0'
        buttons={textEditorButtons}
      />
      <footer className='blockquote-footer d-flex'>
        <cite className='flex-fill'>
          <TextEditor
            keyName={`appTestimonial-${appTestimonialIndex}-source`}
            buttons={textEditorButtons}
          />
        </cite>
      </footer>
    </blockquote>
  </li>
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
    return <div id='container-testimonials' />
  }

  return (
    <div id='container-testimonials' className={className} style={style}>
      <h2 className='my-5 text-center'>Testimonials</h2>
      <ul className='row'>
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
      </ul>
    </div>
  )
}
