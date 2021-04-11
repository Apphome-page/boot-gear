import { useContext } from 'react'
import LoginContext from './LoginContext'

export default function useLogin() {
  const { signPop, signForced, signClear } = useContext(LoginContext) || {}
  return { signPop, signForced, signClear }
}
