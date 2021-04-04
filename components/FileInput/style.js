import styled from '@emotion/styled'

export default ''

export const InputWrap = styled.div`
  height: ${({ size = 0 }) => size}px;
  width: ${({ size = 0 }) => size}px;
  &:before {
    content: '';
    position: absolute;
    top: 12px;
    bottom: 12px;
    left: 12px;
    right: 12px;
    border: 1px dashed #999999;
    z-index: 1;
  }
  &:after {
    content: '${({ label }) => label}';
    margin: 12px;
    padding: 4px;
    border-radius: 4px;
    font-size: ${({ size = 0 }) => size / 8}px;
    font-family: monospace;
    line-height: 1;
    color: #666666;
    background-color: rgba(238, 238, 238, 0.6);
    z-index: 3;
  }
`

export const InputPreview = styled.img`
  padding: 12px;
  object-fit: cover;
  z-index: 2;
`

export const InputDrop = styled.input`
  opacity: 0;
  z-index: 4;
`
