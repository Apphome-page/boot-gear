import { useWebBuilderContext } from '../../../../components/Context/WebBuilder'

import styles from '../../styles.module.scss'

export default function Header() {
  const [appNameValue] = useWebBuilderContext('appName')

  return (
    <div className={styles.asideTitle}>
      {`${appNameValue || 'appName'} - Applanding Page`}
    </div>
  )
}
