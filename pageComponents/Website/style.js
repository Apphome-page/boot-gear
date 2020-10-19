import styled from '@emotion/styled'
import { Form } from 'react-bootstrap'

export default ''

export const Hero = styled.section`
  position: relative;
  min-height: 600px;
  background: url(/img/hero/hero-bg.png) no-repeat left center/cover;
  background-color: #7b10ff;
  color: #fff;
  @media (min-width: 992px) {
    &:before {
      content: '';
      position: absolute;
      top: 3rem;
      left: 50%;
      right: 0;
      bottom: 3rem;
      background: url(/img/hero/hero-template.png) no-repeat right bottom;
      background-size: 100%;
    }
  }
`

export const FormWrap = styled(Form)`
  max-width: 540px;
`
