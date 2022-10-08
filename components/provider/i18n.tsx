import React, { FC, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../util/i18next';

interface Props {
  children: React.ReactNode;
  preferLang: string;
}

const I18nProvider: FC<Props> = ({ children, preferLang }) => {
  useEffect(() => {
    i18n.changeLanguage(preferLang).then(() => console.log('Language Changed', preferLang));
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nProvider;
