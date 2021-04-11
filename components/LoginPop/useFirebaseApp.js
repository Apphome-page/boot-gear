import { useContext } from 'react'
import LoginContext from './LoginContext'

export default function useFirebaseApp() {
  const { firebaseApp } = useContext(LoginContext) || {}
  return firebaseApp
}
