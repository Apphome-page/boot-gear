import { Button, Container, Image } from 'react-bootstrap'
import styled from '@emotion/styled'

export default ''

export const PreviewContainer = styled(Container)`
  max-height: 369px;
  text-align: center;
  overflow-y: scroll;
`

export const PreviewButton = styled(Button)`
  &:after {
    content: attr(data-name) '';
    display: block;
    width: 72px;
    color: #000000;
    font-size: 10px;
    overflow-wrap: break-word;
  }
`

export const PreviewImage = styled(Image)`
  margin: 4px;
  height: 65px;
  width: 65px;
  object-fit: contain;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
  }
`
