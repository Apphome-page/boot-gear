import { Container, Jumbotron } from 'react-bootstrap'

import FrameTemplate from '../../components/FrameTemplate'

export default function ScrTemplate() {
  return (
    <>
      <Jumbotron>
        <Container>Templated Screenshot Generator</Container>
      </Jumbotron>
      <FrameTemplate />
    </>
  )
}
