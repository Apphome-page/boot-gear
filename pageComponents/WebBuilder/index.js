import { useMemo } from 'react'

import WebBuilderContext from '../../components/Context/WebBuilder'
import StoreContext from '../../components/Context'

import AsideComponent from './Aside'

import getThemeComponent from './helpers/getThemeComponent'

import styles from './styles.module.scss'

export default function Builder({ theme, isPreview }) {
  const { HeadComponent, BodyComponent } = useMemo(
    () => getThemeComponent(theme),
    [theme]
  )

  const storeContextValue = useMemo(
    () => ({
      theme,
      isPreview,
    }),
    [theme, isPreview]
  )

  return (
    <StoreContext value={storeContextValue}>
      <WebBuilderContext value={{ appTheme: theme }}>
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
