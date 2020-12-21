import styled from '@emotion/styled'
import { SubscriptionBox } from '../../components/Subscription'

export default ''

export const SubscribeInline = styled(SubscriptionBox)`
  display: inline-block;
  text-align: center;
  @media (min-width: 992px) {
    display: flex;
  }
`

export const Hero = styled.section`
  position: relative;
  background: url(/img/hero/hero-bg.png) no-repeat left center/cover;
  background-color: #7b10ff;
  color: #fff;
  @media (min-width: 992px) {
    min-height: 70vh;
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 3rem;
      bottom: 3rem;
      left: 50%;
      right: 0;
      background: url(/img/hero/hero-template.png) no-repeat right
        bottom/contain;
    }
  }
`
