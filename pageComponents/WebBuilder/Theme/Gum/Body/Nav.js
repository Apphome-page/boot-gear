import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

export function NavName() {
  const [appNameValue] = useWebBuilderContext('appName')
  return <span className='ml-1 align-top text-dark'>{appNameValue}</span>
}

export function NavFeatures() {
  const [{ isPreview }] = useContextStore()
  const [appFeature1] = useWebBuilderContext('appFeature-1')
  const [appFeature2] = useWebBuilderContext('appFeature-2')
  const [appFeature3] = useWebBuilderContext('appFeature-3')
  if (!isPreview && !appFeature1 && !appFeature2 && !appFeature3) {
    return <></>
  }
  return (
    <li className='nav-item'>
      <a className='nav-link' href='#container-feature' target='_self'>
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
    return <></>
  }

  return (
    <li className='nav-item'>
      <a className='nav-link' href='#container-testimonials' target='_self'>
        Testimonials
      </a>
    </li>
  )
}
