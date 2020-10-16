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
`
