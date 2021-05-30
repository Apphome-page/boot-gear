export default function getEditorConfig({
  relativeContainer,
  buttons = [],
  placeholderText = '',
}) {
  return {
    toolbar: {
      buttons,
      static: true,
      updateOnEmptySelection: true,
      relativeContainer,
    },
    placeholder: {
      text: placeholderText,
      hideOnClick: false,
    },
    autoLink: false,
    imageDragging: false,
    spellcheck: false,
  }
}
