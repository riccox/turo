import React, { FC } from 'react';

interface Props {
  className?: string;
}

const Footer: FC<Props> = ({ className = '' }) => {
  return (
    <footer className={`${className} text-neutral-500`}>
      ⚡ Powered by{' '}
      <a
        className={`hover:underline underline-offset-2`}
        href={'https://www.cherryez.com'}
        target={'_blank'}
        rel={'noreferrer'}
      >
        Cherryez
      </a>{' '}
      with ❤️
    </footer>
  );
};

export default Footer;
