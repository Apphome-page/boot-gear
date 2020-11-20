import styled from '@emotion/styled'

export default ''

export const Wrap = styled.div`
  border: 1px solid transparent;
  &:hover {
    border: 1px dotted #cccccc;
  }
`

export const Dummy = styled.div`
  height: 448px;
  width: 256px;
  &:before {
    content: '+';
  }
`
