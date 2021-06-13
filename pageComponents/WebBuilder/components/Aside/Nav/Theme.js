import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'

import webBuilderThemes from '../../../../../config/websiteThemes.json'

export default function NavTheme() {
  const [appKeyValue, setAppKeyValue] = useWebBuilderContext('appTheme')

  const selectAction = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setAppKeyValue(event.target.value)
  }
  return (
    <>
      <div className='ml-3 mr-1 d-flex'>
        <select
          defaultValue={appKeyValue}
          onChange={selectAction}
          className='flex-fill text-capitalize'
        >
          {webBuilderThemes.map(({ key }) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
