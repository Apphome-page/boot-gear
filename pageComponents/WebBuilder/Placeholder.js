import classNames from 'classnames'
import { Code as LoaderCode } from 'react-content-loader'

import styles from './styles.module.scss'

export default function Placeholder() {
  return (
    <div className={styles.wrap}>
      <div className={styles.aside}>
        <div className={classNames('p-3', 'bg-light', styles.asideSticky)} />
      </div>
      <div className={classNames('p-5', styles.preview)}>
        <LoaderCode />
        <LoaderCode />
      </div>
    </div>
  )
}
