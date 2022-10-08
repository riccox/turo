import '@/styles/globals.css';
import '@/styles/scrollbar.css';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import AppProvider from '@/components/provider';
import parser from 'accept-language-parser';
import { SUPPORTED_LANGUAGES } from '@/next-i18next.config';
import { AppState } from '@/store';

interface Props {
  preferLang: string;
  dehydratedState: AppState;
}

function MyApp({ Component, pageProps }: AppProps<Props>) {
  return (
    <AppProvider pageProps={{ ...pageProps }}>
      <Component {...pageProps} />
    </AppProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;
  const appProps = await App.getInitialProps(appContext);

  const request = ctx.req;

  // get user prefer language
  let lang;
  try {
    const header = request?.headers['accept-language'];
    const languages = parser.parse(header);
    lang = languages[0].code.toLowerCase();
    // success get prefer lang
    console.debug('detecting user prefer lang', lang);
  } catch (err) {
    lang = SUPPORTED_LANGUAGES[0];
    console.debug('not found user prefer lang, use default', lang);
  }

  if (SUPPORTED_LANGUAGES.indexOf(lang) === -1) {
    console.debug('detected user prefer lang, but not support, use default', lang);
    lang = SUPPORTED_LANGUAGES[0];
  }
  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      preferLang: lang,
    },
  };
};

// noinspection JSUnusedGlobalSymbols
export default MyApp;
