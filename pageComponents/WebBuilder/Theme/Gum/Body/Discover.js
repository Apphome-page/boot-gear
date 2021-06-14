import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'

export default function Discover() {
  const [appVideoValue] = useWebBuilderContext('appVideo')
  const [appTestimValue] = useWebBuilderContext('appTestim')
  if (!appVideoValue && (!appTestimValue || !appTestimValue.length)) {
    return <></>
  }
  return (
    <div className='row my-5'>
      <div className='col'>
        <button
          type='button'
          className='d-block mx-auto btn btn-light btn-alt2'
        >
          <span>Discover More</span>
        </button>
      </div>
    </div>
  )
}
