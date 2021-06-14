import { useMemo } from 'react'

import WebBuilderContext, {
  useWebBuilderContext,
} from '../../components/Context/WebBuilder'
import StoreContext from '../../components/Context'
import { LinkProvider } from './components/Editor/Link'

import AsideComponent from './components/Aside'

import getThemeComponent from './helpers/getThemeComponent'

import styles from './styles.module.scss'

function PreviewComponent() {
  const [appTheme] = useWebBuilderContext('appTheme')
  const { HeadComponent, BodyComponent } = useMemo(
    () => getThemeComponent(appTheme),
    [appTheme]
  )
  return (
    <>
      <HeadComponent />
      <BodyComponent />
    </>
  )
}

export default function Builder({ appData, isPreview }) {
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
              <PreviewComponent />
            </div>
          </div>
        </WebBuilderContext>
      </LinkProvider>
    </StoreContext>
  )
}
