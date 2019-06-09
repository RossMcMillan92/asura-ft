import Document, { Head, Html, Main, NextScript } from 'next/document'

import React from 'react'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap"
            rel="stylesheet"
            async
          />
          <meta name="Description" content="Todo list." />
          <style>{`body { margin: 0 } /* custom! */`}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
