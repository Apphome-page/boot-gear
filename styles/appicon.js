import styled from '@emotion/styled'

export const IconSource = styled.input`
  height: 100%;
  width: 100%;
  opacity: 0;
`

export const IconGen = styled.button`
  margin: 24px 0px;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #eee;
  color: #999;
  &:not([disabled]) {
    border: none;
    background-color: #6495ed;
    color: #fff;
  }
`

export const Progress = styled.progress`
  width: 100%;
  background: #eee;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2) inset;
  border-radius: 3px;
  appearance: none;
  &[value] {
    appearance: none;
  }
  &:not([value]) {
    appearance: none;
  }
  &[value='0'] {
    display: none;
  }
  &::-webkit-progress-bar {
    background: #eee;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2) inset;
    border-radius: 3px;
  }
  &::-webkit-progress-value {
    background-color: #6495ed;
    border-radius: 3px;
    transition: width 0.1s ease;
  }
  &::-moz-progress-bar {
    background-color: #6495ed;
    border-radius: 3px;
  }
`

export const Wrap = styled.div`
  margin: 0px auto;
  padding: 0px 12px;
  max-width: 1024px;
`

export const Header = styled.header`
  margin: 18px 0px;
  padding: 12px 0px;
  border-bottom: 1px solid #eee;
  font-size: 24px;
`

export const Main = styled.main`
  display: grid;
  grid-template-columns: 400px auto;
  margin: 24px;
  @media (max-width: 768px) {
    display: block;
    > * {
      display: block;
    }
  }
`

export const Footer = styled.div`
  margin: 10px 0px;
  text-align: center;
`

export const Source = styled.div`
  position: relative;
  height: 400px;
  width: 400px;
  border: 1px dashed #ccc;
  border-radius: 5px;
  background-color: #eee;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  &:not([data-filename]):before {
    content: 'Click or drag image file ( 1024 x 1024 )';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    white-space: nowrap;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 264px;
  }
`

export const Options = styled.div`
  padding: 20px;
  label {
    display: block;
    margin: 8px 28px;
  }
  input[data-platform] {
    margin-right: 8px;
    height: 18px;
    width: 18px;
    vertical-align: middle;
  }
`
