import { ChromePicker } from 'react-color'

export default function ColorPicker({ color, onChange }) {
  return (
    <ChromePicker
      className='m-auto'
      disableAlpha
      color={color}
      onChangeComplete={onChange}
    />
  )
}
