import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@/store';

interface Props {
  children: React.ReactNode;
}

const StateProvider: FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={'Waiting for loading persisted states'} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StateProvider;
