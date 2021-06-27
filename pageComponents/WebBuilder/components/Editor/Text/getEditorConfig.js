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
    paste: {
      forcePlainText: true,
      cleanPastedHTML: true,
      cleanReplacements: [],
      cleanAttrs: ['class', 'style', 'dir'],
      cleanTags: ['meta'],
      unwrapTags: [],
    },
    autoLink: false,
    imageDragging: false,
    spellcheck: false,
  }
}
