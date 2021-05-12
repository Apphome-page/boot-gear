import { useCallback } from 'react'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

import LinkEditor from '../../../Editor/Link'

export default function CTA({ keyName, src, alt, height, width }) {
  const [{ isPreview }] = useContextStore()
  const [appValue, setAppValue] = useWebBuilderContext(keyName)
  const onChange = useCallback(
    (href) => {
      setAppValue(href)
    },
    [setAppValue]
  )
  if (!isPreview && !appValue) {
    return <></>
  }
  return (
    <a href={appValue}>
      <LinkEditor
        id={`container-${keyName}`}
        initHref={appValue}
        onChange={onChange}
      >
        <img alt={alt} src={src} height={height} width={width} />
      </LinkEditor>
    </a>
  )
}
