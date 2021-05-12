import Nav from './Nav'
import Footer from './Footer'

import styles from './styles.module.scss'

const webBuilderAtomKeys = [['appTitle', 'App Title', 'Title of your App']]

export default function Aside() {
  return (
    <div className={styles.asideWrap}>
      <div className={styles.asideHead}>AppLanding</div>
      <div className={styles.asideKnobs}>
        <div>
          {webBuilderAtomKeys.map(([atomKey, atomTitle, atomDesc]) => (
            <Nav
              key={atomKey}
              keyName={atomKey}
              keyTitle={atomTitle}
              keyDesc={atomDesc}
            />
          ))}
        </div>
      </div>
      <div className={styles.asideStuds}>
        <Footer />
      </div>
    </div>
  )
}
