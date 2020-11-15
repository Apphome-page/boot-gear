export default {
  name: 'None',
  adjustProps: (newProps) => {
    const { headingSize } = newProps
    return {
      ...newProps,
      headingPosY: 16 + headingSize,
    }
  },
}
