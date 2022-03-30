import Head from 'next/head'
import '../styles/globals.scss'
import Header from '../components/Header'
import Container from 'react-bootstrap/Container'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>OneBitFood V2</title>
        <link ref="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Container>
          <Component {...pageProps} />
        </Container>
      </main>
    </>
  )
}

export default MyApp
