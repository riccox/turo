import type { NextPage } from 'next';
import CommonHead from '@/components/Head';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Icon from '@mdi/react';
import { mdiConsole, mdiGithub } from '@mdi/js';
import Img from '@/components/Img';
import { useTranslation } from 'react-i18next';

const Home: NextPage = () => {
  const { t } = useTranslation('home');
  return (
    <>
      <CommonHead />
      <div className={`page justify-center items-center gap-8`}>
        <div className={`w-96 h-80 flex justify-center items-center`}>
          <Img src="/logo.svg" alt="Logo" />
        </div>
        <p className={`text-5xl font-bold`}>
          {t('hero.welcome')}{' '}
          <a className={`hover:underline`} href="https://turo.cherryez.com" target={'_blank'} rel={'noreferrer'}>
            Turo
          </a>
        </p>
        <p className={`text-3xl`}>
          <a className={`hover:underline underline-offset-8`} href="https://github.com/cherryez/turo">
            {t('Open_Source')}
          </a>
          {t('hero.description')}
        </p>
        <div className={`flex gap-4`}>
          <Button href={'/@/'} leftIcon={<Icon path={mdiConsole} size={1} />}>
            {t('Console')}
          </Button>
          <Button
            href={'https://github.com/cherryez/turo'}
            target={'_blank'}
            color={'secondary'}
            leftIcon={<Icon path={mdiGithub} size={1} />}
          >
            Github
          </Button>
        </div>
        <Footer />
      </div>
    </>
  );
};

// noinspection JSUnusedGlobalSymbols
export default Home;
