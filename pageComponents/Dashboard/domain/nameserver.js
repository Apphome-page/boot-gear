export default function DomainNameserver({ webKey, webData }) {
  return (
    <div>
      Your domain ({webKey}) was setup successfully!
      <code>{JSON.stringify(webData)}</code>
    </div>
  )
}
