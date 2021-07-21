import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

export function NavName() {
  const [appNameValue] = useWebBuilderContext('appName')
  return <span className='ml-1 align-top'>{appNameValue}</span>
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
    <a className='p-2 d-inline-block' href='#container-feature' target='_self'>
      Features
    </a>
  )
}

export function NavVideo() {
  const [{ isPreview }] = useContextStore()
  const [appVideo] = useWebBuilderContext('appVideo')
  if (!isPreview && !appVideo) {
    return <></>
  }
  return (
    <a className='p-2 d-inline-block' href='#container-appVideo' target='_self'>
      Video
    </a>
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
    <a
      className='p-2 d-inline-block'
      href='#container-testimonials'
      target='_self'
    >
      Testimonials
    </a>
  )
}

export function NavItem({ keyName, href, children }) {
  const [{ isPreview }] = useContextStore()
  const [appKeyValue] = useWebBuilderContext(keyName)
  if (isPreview) {
    return <div className='d-inline-block a-link'>{children}</div>
  }
  if (!isPreview && appKeyValue) {
    return (
      <a className='p-2 d-inline-block' href={href} rel='noindex, nofollow'>
        {children}
      </a>
    )
  }
  return <></>
}
