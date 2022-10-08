import React, { FC } from 'react';
import I18nProvider from '@/components/provider/i18n';
import ReactQueryProvider from '@/components/provider/react-query';
import StateProvider from '@/components/provider/state';

interface Props {
  children: React.ReactNode;
  pageProps: {
    preferLang: string;
    dehydratedState: unknown;
  };
}

const AppProvider: FC<Props> = ({ children, pageProps }) => {
  return (
    <StateProvider>
      <ReactQueryProvider pageProps={pageProps}>
        <I18nProvider preferLang={pageProps.preferLang}>{children}</I18nProvider>
      </ReactQueryProvider>
    </StateProvider>
  );
};

export default AppProvider;
