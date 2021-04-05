import styled from '@emotion/styled'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

export default ''

export const AuthWrap = styled(StyledFirebaseAuth)`
  .firebaseui-container {
    max-width: none;
  }
  .firebaseui-title:after {
    content: '/ Sign up';
    margin: 0px 4px;
  }
  .mdl-button--primary.mdl-button--primary,
  .mdl-textfield--floating-label.is-focused .mdl-textfield__label {
    color: #7b10ff;
  }
  .mdl-button--raised.mdl-button--colored,
  .mdl-button--raised.mdl-button--colored:active,
  .mdl-button--raised.mdl-button--colored:focus:not(:active),
  .mdl-button--raised.mdl-button--colored:hover,
  .mdl-button--primary.mdl-button--primary.mdl-button--fab,
  .mdl-button--primary.mdl-button--primary.mdl-button--raised,
  .mdl-progress > .progressbar,
  .mdl-progress.mdl-progress--indeterminate > .bar1,
  .mdl-progress.mdl-progress__indeterminate > .bar1,
  .mdl-progress.mdl-progress--indeterminate > .bar3,
  .mdl-progress.mdl-progress__indeterminate > .bar3,
  .mdl-textfield__label:after,
  .firebaseui-textfield.mdl-textfield .firebaseui-label:after {
    background-color: #7b10ff;
  }
`
