import styled from '@emotion/styled'

const Move = `
  display: inline-block;
  &:before {
    text-align: center;
  }
`

export const MoveUp = styled.button`
  ${Move}
  &:before {
    content: '🠕';
  }
`

export const MoveDown = styled.button`
  ${Move}
  &:before {
    content: '🠗';
  }
`

export const MoveLeft = styled.button`
  ${Move}
  &:before {
    content: '🠔';
  }
`

export const MoveRight = styled.button`
  ${Move}
  &:before {
    content: '🠖';
  }
`

export const RotateLeft = styled.button`
  ${Move}
  &:before {
    content: '⭯';
  }
`

export const RotateRight = styled.button`
  ${Move}
  &:before {
    content: '⭮';
  }
`
