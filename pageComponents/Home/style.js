import styled from '@emotion/styled'

export default ''

export const Hero = styled.section`
  position: relative;
  background: url(/img/hero/hero-bg.png) no-repeat left center/cover;
  background-color: #7b10ff;
  color: #fff;
  @media (min-width: 992px) {
    min-height: 100vh;
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 3rem;
      bottom: 3rem;
      left: 50%;
      right: 0;
      background: url(/img/hero/hero-img.png) no-repeat right bottom;
      background-size: 100%;
    }
  }
`

export const FeatureImage = styled.div`
  position: relative;
  height: 86px;
  width: 86px;
  background: #ffffff url(${(props) => props['data-src']}) no-repeat center;
  background-size: contain;
`

export const CardIcon = styled.div`
  position: relative;
  height: 86px;
  width: 86px;
  border-radius: 50%;
  background: #ffffff url(${(props) => props['data-src']}) no-repeat center;
  background-size: 40px;
`
