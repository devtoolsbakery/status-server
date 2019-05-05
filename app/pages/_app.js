import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';

import '../styles/index.css';


class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = { theme: 'default' };

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  // TODO: Enable server rendering for styled components
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Container>
          <Component {...pageProps} />
        </Container>
      </>
    );
  }
}

export default MyApp;
