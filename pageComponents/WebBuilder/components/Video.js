import classNames from 'classnames'

import { useWebBuilderContext } from '../../../components/Context/WebBuilder'
import { useContextStore } from '../../../components/Context'

import LinkEditor from './Editor/Link'

import styles from './styles.module.scss'

export function VideoScript() {
  const [{ isPreview }] = useContextStore()
  const [appVideoValue] = useWebBuilderContext('appVideo')
  if (isPreview) {
    return <></>
  }
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
      document
      .getElementById("icon-play")
      .addEventListener("click", function () {
        var containerElem = document.getElementById("container-play");
        var iframeElem = Object.assign(document.createElement("iframe"), {
          src: "${appVideoValue}",
          frameBorder: "0",
          allow:
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowFullscreen: "",
          loading: "lazy",
          className: "embed-responsive-item"
        });
        containerElem.innerHTML = "";
        containerElem.appendChild(iframeElem);
      });
    `,
      }}
    />
  )
}

export default function Video({ className = '', style = {} }) {
  const [{ isPreview }] = useContextStore()
  const [appVideoValue] = useWebBuilderContext('appVideo')
  if (!isPreview && !appVideoValue) {
    return <div id='container-play' />
  }
  return (
    <LinkEditor keyName='appVideo'>
      <div id='container-play' className={className} style={style}>
        <svg
          id='icon-play'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          className={classNames('bi bi-play-circle-fill', styles.iconPlay)}
          viewBox='0 0 16 16'
        >
          <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z' />
        </svg>
      </div>
    </LinkEditor>
  )
}
