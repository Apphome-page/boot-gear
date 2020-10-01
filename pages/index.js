import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Title</title>
      </Head>
      <h1> HOME </h1>
      <Link href='/appicon'>App Icon Generator</Link>
      <br />
      <Link href='/appscreenshot'>App Screenshot Generator</Link>
    </div>
  )
}
