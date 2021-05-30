import { useWebBuilderContext } from '../../../../components/Context/WebBuilder'

export default function NavKey() {
  const [appKeyValue] = useWebBuilderContext('appKey')

  return <div>{appKeyValue || 'appKey'}</div>
}
