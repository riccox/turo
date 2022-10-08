import React, { FunctionComponent, useState } from 'react';
import { Hydrate, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { createQueryClient } from '@/util/react-query';

interface Props {
  children: React.ReactNode;
  pageProps: { dehydratedState: unknown };
}

const ReactQueryProvider: FunctionComponent<Props> = ({ children, pageProps }) => {
  const [queryClient] = useState(() => createQueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </Hydrate>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
