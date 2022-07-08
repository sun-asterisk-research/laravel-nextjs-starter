import App from 'next/app';
import { useState } from 'react';

import '~/styles/globals.css'
import AuthContext from '~/contexts/AuthContext';

NextApp.getInitialProps = async (ctx) => {
  // Is SSR
  if (ctx?.ctx?.req) {
    const response = await fetch(`${process.env.SERVER_API_HOST}/api/web-init`);
    const { data } = await response.json();
    const appData = App.getInitialProps(ctx);

    return {
      ...appData,
      data,
    }
  }

  return {}
}

function NextApp({ Component, pageProps, data }) {
  const [authUser] = useState(data);

  return (
    <AuthContext.Provider value={authUser}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}

export default NextApp;
