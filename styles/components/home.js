import styled from '@emotion/styled'

export default ''

export const Hero = styled.section`
  position: relative;
  min-height: 600px;
  background: url(/img/hero/hero-bg.png) no-repeat left center/cover;
  background-color: #7b10ff;
  color: #fff;
`

export const HeroImage = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 100%;
  background: url(/img/hero/hero-img.png) no-repeat right bottom/contain;
`

export const FeatureImage = styled.div`
  position: relative;
  height: 86px;
  width: 86px;
  border-radius: 50%;
  background: #ffffff url(${(props) => props['data-src']}) no-repeat center;
  background-size: 40px;
`
