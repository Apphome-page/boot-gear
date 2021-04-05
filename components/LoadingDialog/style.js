import styled from '@emotion/styled'
import { Spinner } from 'react-bootstrap'

export default ''

export const BigSpinner = styled(Spinner)(
  ({
    sizing = 128,
    thickness = parseInt(sizing / 16, 10),
    duration = parseInt(thickness / 4, 10),
    direction = 'normal',
  }) => ({
    height: `${sizing}px`,
    width: `${sizing}px`,
    borderWidth: `${thickness}px`,
    animationDuration: `${duration}s`,
    animationDirection: `${direction}`,
    // borderTop: 0,
    // borderBottom: 0,
    borderRightColor: 'rgba(123, 16, 255, 0.1)',
  })
)
