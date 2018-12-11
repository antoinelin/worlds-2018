import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'

const About = () => (
  <React.Fragment>
    <Head>
      <title>About | Worlds 2018 - Scoreboard !</title>
    </Head>
    <h1>About page</h1>
    <p><Link href="/"><a>Go Home</a></Link></p>
  </React.Fragment>
)

export default About
