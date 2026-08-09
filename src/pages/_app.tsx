import { AppProps } from 'next/app.jsx';
import { ReactElement } from 'react';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default App;
