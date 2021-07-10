import { Container, Row, Col } from 'react-bootstrap'
import classNames from 'classnames'

import IconLeft from '@svg-icons/bootstrap/arrow-return-left.svg'

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
    <Container id='container-appVideo'>
      <Row noGutters className='align-items-start py-5'>
        <Col lg={6}>
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
                className='bi bi-play-circle-fill icon-play'
                viewBox='0 0 16 16'
              >
                <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z' />
              </svg>
            </div>
          </LinkEditor>
        </Col>
        <Col lg={6}>
          <Container fluid className='p-0 rounded-lg overflow-hidden'>
            <Row noGutters className='py-3 bg-primary text-light'>
              <Col className='px-5 py-3 '>
                <div className='display-4 font-weight-bold'>Watch Video</div>
              </Col>
            </Row>
            <Row noGutters className='py-3 bg-light text-dark'>
              <Col className='px-5 py-3'>
                <TextEditor
                  keyName='appVideo-caption'
                  placeholderText='Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed consequuntur magni dolores ratione voluptatem sequi nesciunt.'
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <IconLeft
                  height='64'
                  width='64'
                  className='mx-1 my-3 text-white-50'
                />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}
