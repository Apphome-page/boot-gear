import { useCallback, useState } from 'react'

import IconClose from '@svg-icons/bootstrap/x-circle.svg'
import IconMenu from '@svg-icons/bootstrap/list-ul.svg'
import IconHome from '@svg-icons/bootstrap/house.svg'

import Link from '../Tag/Link'

export default function Aside() {
  const [isMini, setMini] = useState(true)
  const onToggleAction = useCallback(() => {
    setMini((prev) => !prev)
  }, [])
  return (
    <div className='aside-wrap'>
      <div
        tabIndex='-1'
        role='button'
        className='aside-item'
        onClick={onToggleAction}
        onKeyDown={onToggleAction}
      >
        {isMini ? (
          <IconMenu className='aside-icon' height='48' width='48' />
        ) : (
          <IconClose className='aside-icon' height='48' width='48' />
        )}
      </div>
      <Link href='/'>
        <div className='aside-item'>
          <IconHome className='aside-icon' height='48' width='48' /> Home
        </div>
      </Link>
      <style jsx>
        {`
          .aside-wrap {
            width: ${isMini ? '48px' : 'auto'};
          }
        `}
      </style>
      <style jsx>{`
        .aside-wrap {
          display: flex;
          flex-direction: column;
          padding-right: 8px;
          box-shadow: 2px -4px 8px 0px black;
        }
        .aside-wrap > :global(.aside-item) {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
        }
        .aside-wrap > :global(.aside-item) > :global(.aside-icon) {
          padding: 8px;
        }
        .aside-wrap > :global(.aside-item) > * {
          display: inline-block;
        }
      `}</style>
    </div>
  )
}
