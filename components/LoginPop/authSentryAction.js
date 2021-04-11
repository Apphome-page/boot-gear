import {
  setUser as setUserSentry,
  configureScope as configureScopeSentry,
} from '@sentry/react'

export const unAuthSentryAction = () => {
  configureScopeSentry((scope) => scope.setUser(null))
}

export default function authSentryAction(authState) {
  const { uid, displayName, email, phoneNumber, providerId } = authState || {}
  if (uid) {
    setUserSentry({
      id: uid,
      username: displayName,
      email,
      phone_number: phoneNumber,
      provider_id: providerId,
      ip_address: '{{auto}}',
    })
  } else {
    unAuthSentryAction()
  }
}
