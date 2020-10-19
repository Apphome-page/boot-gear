import Head from 'next/head'

import HomeHero from '../pageComponents/Home/hero'
import HomeCards from '../pageComponents/Home/cards'
import HomeShowcase from '../pageComponents/Home/showcase'
import HomeCTA from '../pageComponents/Home/cta'
import HomePricing from '../pageComponents/Home/pricing'
import HomeFeatures from '../pageComponents/Home/features'
import HomeBlog from '../pageComponents/Home/blog'

export default function Home() {
  return (
    <>
      <Head>
        <title>Homepage for mobile APPs, with free screenshots tools</title>
      </Head>
      <HomeHero />
      <HomeCards />
      <HomeShowcase />
      <HomeCTA />
      <HomePricing />
      <HomeFeatures />
      <HomeBlog />
    </>
  )
}
