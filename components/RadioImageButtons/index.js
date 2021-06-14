import { Image, FormCheck } from 'react-bootstrap'
import classNames from 'classnames'

import styles from './styles.module.scss'

export default function RadioImageButtons({ name, options }) {
  return (
    <>
      {options.map(({ key, src }) => (
        <FormCheck
          custom
          inline
          key={key}
          id={`${name}-${key}`}
          value={key}
          type='radio'
          name={name}
          className={classNames('p-0', 'm-1', 'border', 'rounded', 'bg-light')}
        >
          <FormCheck.Input value={key} type='radio' name={name} />
          <FormCheck.Label
            className={classNames('cursor-pointer', styles.plainLabel)}
          >
            <Image
              src={src}
              width='200'
              height='105'
              className='m-0 p-0'
              data-theme={key}
            />
          </FormCheck.Label>
        </FormCheck>
      ))}
    </>
  )
}
