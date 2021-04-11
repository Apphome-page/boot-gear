/* eslint-disable react/no-danger */
import { Container } from 'react-bootstrap'
import classNames from 'classnames'

export function FAQList({ faqList = [] }) {
  return (
    <>
      {faqList.map(({ title, desc }, index) => (
        <details
          className={classNames('py-3', {
            'border-bottom': index !== faqList.length - 1,
          })}
          key={index}
        >
          <summary
            className='lead'
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p
            className='ml-5 mb-1 py-3'
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </details>
      ))}
    </>
  )
}

export default function FAQ({ fluid, faqList = [] }) {
  return (
    <Container fluid={fluid}>
      {faqList.length ? (
        <div className='h1 my-3 text-center'>Frequently Asked Questions</div>
      ) : (
        ''
      )}
      <FAQList faqList={faqList} />
    </Container>
  )
}
