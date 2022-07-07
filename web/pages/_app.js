import App from 'next/app';

import '../styles/globals.css'
import AuthContext from './contexts/AuthContext';

NextApp.getInitialProps = async (ctx) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const user = await response.json();
  const appData = App.getInitialProps(ctx);

  return {
    ...appData,
    user,
  }
}

function NextApp({ Component, pageProps, user }) {
  return (
    <AuthContext.Provider value={user}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}

export default NextApp;
