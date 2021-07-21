import { Container, Row, Col } from 'react-bootstrap'
import classNames from 'classnames'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

import LinkEditor from '../../../components/Editor/Link'
import TextEditor from '../../../components/Editor/Text'

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
        var containerElem = document.getElementById("container-appVideo");
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

export default function Video({ style = {} }) {
  const [{ isPreview }] = useContextStore()
  const [appVideoValue] = useWebBuilderContext('appVideo')
  if (!isPreview && !appVideoValue) {
    return <div id='container-appVideo' />
  }

  return (
    <Container id='container-appVideo' className='my-5'>
      <Row className='py-3 text-center'>
        <Col lg={2} />
        <Col lg={8}>
          <span className='d-block p-3 lead text-uppercase text-black-50'>
            Watch Video
          </span>
          <TextEditor
            keyName='appVideo-caption'
            placeholderText='Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed consequuntur magni dolores ratione voluptatem sequi nesciunt.'
          />
        </Col>
        <Col lg={2} />
      </Row>
      <Row className='py-3'>
        <Col lg={2} />
        <Col lg={8}>
          <LinkEditor keyName='appVideo'>
            <div
              className={classNames(
                'position-relative',
                'd-flex',
                'align-items-center',
                'justify-content-center',
                'embed-responsive',
                'bg-white',
                'text-white',
                'video-play-wrap'
              )}
              style={style}
            >
              <svg
                id='icon-play'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                className='bi bi-play-circle-fill border border-dark bg-dark icon-play'
                viewBox='0 0 16 16'
              >
                <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z' />
              </svg>
            </div>
          </LinkEditor>
        </Col>
        <Col lg={2} />
      </Row>
    </Container>
  )
}
