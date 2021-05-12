import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilCallback,
} from 'recoil'
import memoize from 'lodash/memoize'

import allAtoms from './atoms.json'

// Memoized Atom Generator
const atomWithKey = memoize((atomKey) => {
  if (!Object.prototype.hasOwnProperty.call(allAtoms, atomKey)) {
    throw new Error('Invalid Atom Key for AppBuilder')
  }
  return atom({
    key: atomKey,
    default: allAtoms[atomKey],
  })
})

// Full Control Selector
const appBuilderAtoms = selector({
  key: 'appBuilderAtoms',
  get: ({ get }) =>
    Object.keys(allAtoms).reduce(
      (atomAcc, atomKey) => ({
        ...atomAcc,
        [atomKey]: get(atomWithKey(atomKey)),
      }),
      {}
    ),
  set: ({ set }, deltaValues) =>
    Object.keys(deltaValues).forEach((atomKey) => {
      set(atomWithKey(atomKey), deltaValues[atomKey])
    }),
})

const initializeAtoms = (defaultValue = {}) => ({ set }) =>
  Object.keys(defaultValue).forEach((atomKey) => {
    set(atomWithKey(atomKey), defaultValue[atomKey])
  })

export default function WebBuilderContext({ value, children }) {
  return (
    <RecoilRoot initializeState={initializeAtoms(value)}>{children}</RecoilRoot>
  )
}

// Register & Subscribe to Atom
export function useWebBuilderContext(appKeyName) {
  const appState = useRecoilState(
    appKeyName ? atomWithKey(appKeyName) : appBuilderAtoms
  )
  return appState
}

// Read Atom w/o Subscription
export function useWebBuilderCallback(appKeyName) {
  const appStateCallback = useRecoilCallback(({ snapshot }) => async () => {
    const appBuilderValues = await snapshot.getPromise(
      appKeyName ? atomWithKey(appKeyName) : appBuilderAtoms
    )
    return appBuilderValues
  })
  return appStateCallback
}
