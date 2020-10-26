import { Container } from 'react-bootstrap'

export default function FAQ({ fluid, faqList = [] }) {
  return (
    <Container fluid={fluid}>
      {faqList.length ? (
        <div className='h1 my-4 text-center'>Frequently Asked Questions</div>
      ) : (
        ''
      )}
      {faqList.map(({ title, desc }, index) => (
        <details
          className={`py-3${
            index !== faqList.length - 1 ? ' border-bottom' : ''
          }`}
          key={index}
        >
          <summary className='lead'>{title}</summary>
          <p className='ml-5 py-2'>{desc}</p>
        </details>
      ))}
    </Container>
  )
}
