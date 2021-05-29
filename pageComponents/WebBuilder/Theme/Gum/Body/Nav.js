import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

export function NavName() {
  const [appNameValue] = useWebBuilderContext('appName')
  return <span className='text-dark'>{appNameValue}</span>
}

export function NavFeatures() {
  const [appVideoValue] = useWebBuilderContext('appVideo')
  if (!appVideoValue) {
    return <></>
  }
  return (
    <li className='nav-item'>
      <a className='nav-link' href='#container-play' target='_self'>
        Features
      </a>
    </li>
  )
}

export function NavTestimonials() {
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
    ;<></>
  }

  return (
    <li className='nav-item'>
      <a className='nav-link' href='#container-testimonials' target='_self'>
        Testimonials
      </a>
    </li>
  )
}
