export default function AlertContainer({ children }) {
  return (
    <aside className='alert-container'>
      {children}
      <style jsx>{`
        .alert-container {
          position: fixed;
          max-height: 70vh;
          bottom: 64px;
          left: 32px;
          width: 320px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          overflow: hidden;
          z-index: 2000;
        }
        @media (max-width: 768px) {
          .alert-container {
            bottom: 16px;
            left: 16px;
            right: 16px;
            width: unset;
          }
        }
      `}</style>
    </aside>
  )
}
