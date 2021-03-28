import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { Alert } from 'react-bootstrap'

export default ''

export const AlertBody = styled(Alert)(({ timeout = 0 }) => {
  const animKeyFrames = keyframes`
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  `
  return {
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '0px',
      left: '0px',
      right: '0px',
      display: timeout === -1 ? 'none' : 'block',
      width: '100%',
      height: '2px',
      background: 'rgba(0,0,0,0.3)',
      animation: `${animKeyFrames} ${timeout}s linear`,
    },
  }
})
