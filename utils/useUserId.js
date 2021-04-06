/* eslint-disable react-hooks/rules-of-hooks */
import { useAuth } from 'reactfire'
import { useAmp } from 'next/amp'

export default function useUserId(dead) {
  const isAmp = useAmp()
  if (isAmp || dead) {
    return null
  }
  const userAuth = useAuth()
  return (userAuth && userAuth.currentUser && userAuth.currentUser.uid) || null
}
