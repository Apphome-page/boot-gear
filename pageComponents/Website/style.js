import styled from '@emotion/styled'
import { ProgressBar } from 'react-bootstrap'

import { ArrowRightCircleFill as IconNext } from '@emotion-icons/bootstrap/ArrowRightCircleFill'
import { CheckCircleFill as IconCheck } from '@emotion-icons/bootstrap/CheckCircleFill'
import { PlayCircleFill as IconPlay } from '@emotion-icons/bootstrap/PlayCircleFill'

export default ''

export const Hero = styled.section`
  position: relative;
  background: url(/img/hero/hero-bg.png) no-repeat left center/cover;
  background-color: #7b10ff;
  color: #fff;
`

export const ThemeImage = styled.div`
  border-width: 4px !important;
`

export const ProgressRail = styled(ProgressBar)`
  height: 4px;
`

export const ProgressButton = styled(IconNext)(
  ({ currentIndex, maxIndex }) => ({
    top: '50%',
    left: `${((100 * currentIndex) / maxIndex).toFixed(3)}%`,
    transform: 'translate(-50%,-50%)',
    opacity: 1,
    transition: `all 0.1s linear ${(2 / maxIndex).toFixed(2)}s`,
    '&:disabled': {
      opacity: 1,
    },
  })
)

export const ProgressStart = styled(IconPlay)`
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
  transition: all 0.1s linear 0.3s;
`

export const ProgressEnd = styled(IconCheck)`
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
  transition: all 0.1s linear 0.3s;
`
