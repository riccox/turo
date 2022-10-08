import React, { FC, useMemo } from 'react';
import Head from 'next/head';

interface Props {
  children?: React.ReactNode;
  title?: string;
}

const CommonHead: FC<Props> = ({ children, title }) => {
  const pageTitle = useMemo(() => {
    return title ? `${title} - Turo` : 'Turo';
  }, []);

  return (
    <Head>
      <title>{pageTitle}</title>
      {children}
    </Head>
  );
};

export default CommonHead;
