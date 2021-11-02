import Head from 'next/head'
import React from 'react'

import Hero from '../components/Hero'

export default function Home() {

  return (
    <>
      <Head>
        <title>Movies Lost and Found</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Hero />
    </>
  )
}


