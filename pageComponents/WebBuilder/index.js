import { useMemo } from 'react'

import WebBuilderContext from '../../components/Context/WebBuilder'
import StoreContext from '../../components/Context'

import AsideComponent from './Aside'

import getThemeComponent from './helpers/getThemeComponent'

import styles from './styles.module.scss'

export default function Builder({ appKey, appTheme, isPreview }) {
  const { HeadComponent, BodyComponent } = useMemo(
    () => getThemeComponent(appTheme),
    [appTheme]
  )

  return (
    <StoreContext value={{ isPreview }}>
      <WebBuilderContext value={{ appKey, appTheme }}>
        <div className={styles.wrap}>
          <div className={styles.aside}>
            <div className={styles.asideSticky}>
              <AsideComponent />
            </div>
          </div>
          <div className={styles.preview}>
            <HeadComponent />
            <BodyComponent />
          </div>
        </div>
      </WebBuilderContext>
    </StoreContext>
  )
}
