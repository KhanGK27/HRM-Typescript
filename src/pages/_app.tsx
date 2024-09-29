import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isLoginPage = router.pathname === '/login';

  return isLoginPage ? (
    <Component {...pageProps} />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
