export default {
  name: 'None',
  adjustProps: (newProps) => {
    const { headingSize } = newProps
    return {
      ...newProps,
      heading: '',
      headingPosY: 16 + headingSize,
    }
  },
}
