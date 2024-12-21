import { Html, Head, Main, NextScript } from 'next/document';
import Providers from './providers';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Providers>
          <Main />
          <NextScript />
        </Providers>
      </body>
    </Html>
  );
}
