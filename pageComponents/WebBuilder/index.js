import { useMemo } from 'react'

import WebBuilderContext from '../../components/Context/WebBuilder'
import StoreContext from '../../components/Context'
import { LinkProvider } from './components/Editor/Link'

import AsideComponent from './components/Aside'

import getThemeComponent from './helpers/getThemeComponent'

import styles from './styles.module.scss'

export default function Builder({ appData, isPreview }) {
  const { appTheme } = appData || {}
  const { HeadComponent, BodyComponent } = useMemo(
    () => getThemeComponent(appTheme),
    [appTheme]
  )

  return (
    <StoreContext value={{ isPreview }}>
      <LinkProvider>
        <WebBuilderContext value={appData}>
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
      </LinkProvider>
    </StoreContext>
  )
}
